import { Attributes, BasicValue, ChildType, acceptsNodeName, ChildTypes, isChildTypeRequired, stringToChildTypes, childTypesArray, isChildTypeSingle } from "../utils";
import { SchemaNode } from "../serializer";

export abstract class BaseNode {
    static nodeName = 'node';
    static domNodeName = '';
    static inline?: boolean;
    static fields: Array<string>;
    static childTypes: ChildTypes;
    protected _children?: BaseNode[];
    protected _props!: Record<string, BasicValue>;

    constructor(attributes?: Attributes) {
        if (attributes) {
            this._props = this.static.attributesToProps(attributes);
        }
    }

    static attributesToProps<T extends Record<string, BasicValue>>(attributes: Attributes = {}): T {
        const result: Record<string, BasicValue> = {};
        this.fields.forEach(field => {
            const attr = attributes[field];
            result[field] = typeof attr === 'string' ? attr : attr?.value;
        });
        return result as T;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static isValidField(field: string, value: BasicValue): boolean {
        return true;
    }

    static get nodeType(): string {
        return this.nodeName;
    }

    public get static(): typeof BaseNode {
        return this.constructor as typeof BaseNode;
    }

    get children(): BaseNode[] | undefined {
        return this._children;
    }

    get json(): Record<string, BasicValue> {
        return {
            nodeName: this.static.nodeName,
            ...this._props,
            children: this._children?.map(child => child.json),
        };
    }
    get pmJson(): Record<string, BasicValue> {
        return {
            type: this.static.nodeType.replace(/-/g, '_'),
            attrs: this._props,
            content: this._children?.map(child => child.pmJson),
        };
    }
    // schema
    static get pmSchemaChildren(): string[] {
        return [];
        // return this.childGroups
        // .map(group => nodeGroups[group.name])
        // .reduce((array, group) => [...array, ...group], this.childTypes.map(({ name }) => name));
    }
    static pmSchema(next: (nodeName: string) => void): SchemaNode {
        const children = this.pmSchemaChildren;
        const result: SchemaNode = {
            domNodeName: this.domNodeName || 'jdita-node-' + this.nodeName,
            attrs: this.fields.reduce((attrs, field) => {
                attrs[field] = { default: '' };
                return attrs;
            }, {} as Record<string, { default: string }>),
        };
        if (children.length) {
            result.content = '(' + children.map(child => (child === 'text' ? 'text_node' : child.replace(/-/g, '_'))).join('|') + ')*';
        }
        if (this.inline) {
            result.inline = true;
        }
        children.forEach(next);
        return result;
    }
    canAdd(child: BaseNode): boolean {
        const childNodeName = child.static.nodeName;
        const childTypes = childTypesArray(this.static.childTypes)
        let childType: ChildType | undefined;
        let iChild = -1;
        childTypes.some((type, i) => {
            childType = acceptsNodeName(childNodeName, type);
            if (childType) {
                iChild = i;
                return true;
            }
        });
        if (!childType) {
            return false;
        }
        const last = this._children?.length ? this._children[this._children.length - 1].static.nodeName : '';
        let iLast = -1;
        if (last) {
            iLast = childTypes.findIndex(type => acceptsNodeName(last, type));
            if (iLast > iChild) {
                return false;
            }
            if (iLast === iChild) {
                if (isChildTypeSingle(childTypes[iChild])) {
                    return false;
                }
                return true;
            }
        }
        const typesBetween = childTypes.slice(iLast + 1, iChild);
        if (typesBetween.find(isChildTypeRequired)) {
            return false;
        }
        return true;
    }
        add(child: BaseNode, breakOnError = true): void {
        if (!this._children) {
            this._children = [];
        }
        if (!this.canAdd(child)) {
            if (breakOnError) {
                throw new Error(`"${child.static.nodeName}" node can't be a child of "${this.static.nodeName}" node`);
            }
            return;
        }
        this._children.push(child)
    }
    isNode(name: string): boolean {
        return name === this.static.nodeName;
    }
    readProp<T = BasicValue>(field: string): T {
        if (this.static.fields.indexOf(field) < 0) {
            throw new Error('unknown property "' + field + '"');
        }
        return this._props[field] as T;
    }
    writeProp<T = BasicValue>(field: string, value: T): void {
        if (this.static.fields.indexOf(field) < 0) {
            throw new Error('unknown property "' + field + '"');
        }
        if (!this.static.isValidField(field, value)) {
            throw new Error('wrong property  type "' + typeof (value) + '" for field"' + field + '"');
        }
        this._props[field] = value;
    }
}

export type Constructor = { new(attributes: Attributes): BaseNode };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeAll<T extends { new(...args: any[]): BaseNode }>(constructor: T, ...decorators: ((constructor: T) => T)[]): T {
    return decorators.reduce((result, decorator) => decorator(result), constructor);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeComponent<T extends { new(...args: any[]): BaseNode }>(
    decorator: (constructor: T) => T,
    nodeName: string,
    fieldValidator: (field: string, value: BasicValue) => boolean,
    fields: Array<string>,
    childTypes: Array<string> = [],

) {
    return (constructor: T): T => decorator(class extends constructor {
        static nodeName = nodeName;
        static fields = fields;
        static childTypes = stringToChildTypes(childTypes);
        static isValidField = fieldValidator;
    });
}

