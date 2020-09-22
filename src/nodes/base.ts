import { acceptsNodeName, isChildTypeRequired, stringToChildTypes, isChildTypeSingle } from "../utils";
import { ChildTypes, ChildType, OrArray, BasicValue, Attributes, NonAcceptedChildError, WrongAttributeTypeError, UnknownAttributeError, JDita } from "../classes";

export abstract class BaseNode {
    static nodeName = 'node';
    static inline?: boolean;
    static fields: Array<string>;
    static childTypes: ChildTypes[];
    public _children?: BaseNode[];
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

    public get static(): typeof BaseNode {
        return this.constructor as typeof BaseNode;
    }

    get children(): BaseNode[] {
        return this._children || [];
    }

    get json(): JDita {
        return {
            nodeName: this.static.nodeName,
            attributes: this._props,
            children: this._children?.map(child => child.json),
        };
    }
    canAdd(child: BaseNode): boolean {
        const childNodeName = child.static.nodeName;
        let childType: ChildType | undefined;
        let iChild = -1;
        this.static.childTypes.some((type, i) => {
            childType = acceptsNodeName(childNodeName, type);
            if (childType) {
                iChild = i;
                return true;
            }
        });
        if (!childType) {
            return false;
        }
        const last = this.children?.length ? this.children[this.children.length - 1].static.nodeName : '';
        let iLast = -1;
        if (last) {
            iLast = this.static.childTypes.findIndex(type => acceptsNodeName(last, type));
            if (iLast > iChild) {
                return false;
            }
            if (iLast === iChild) {
                if (isChildTypeSingle(this.static.childTypes[iChild])) {
                    return false;
                }
                return true;
            }
        }
        const typesBetween = this.static.childTypes.slice(iLast + 1, iChild);
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
                throw new NonAcceptedChildError(`"${child.static.nodeName}" node can't be a child of "${this.static.nodeName}" node`);
            }
            return;
        }
        this._children.push(child)
    }
    readProp<T = BasicValue>(field: string): T {
        if (this.static.fields.indexOf(field) < 0) {
            throw new UnknownAttributeError('unknown attribute "' + field + '"');
        }
        return this._props[field] as T;
    }
    writeProp<T = BasicValue>(field: string, value: T): void {
        if (this.static.fields.indexOf(field) < 0) {
            throw new UnknownAttributeError('unknown attribute "' + field + '"');
        }
        if (!this.static.isValidField(field, value)) {
            throw new WrongAttributeTypeError('wrong attribute type "' + typeof (value) + '" for field"' + field + '"');
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
    childTypes: OrArray<string> = [],

) {
    return (constructor: T): T => decorator(class extends constructor {
        static nodeName = nodeName;
        static fields = fields;
        static childTypes = stringToChildTypes(childTypes);
        static isValidField = fieldValidator;
    });
}

