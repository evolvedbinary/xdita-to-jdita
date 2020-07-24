import { has, nodeGroups, Attributes, BasicValue } from "../utils";

export abstract class BaseNode {
    static nodeName = 'node';
    static fields: Array<string>;
    static childTypes: Array<string> = [];
    static childGroups: Array<string> = [];
    protected _children?: BaseNode[];
    protected _props!: Record<string, BasicValue>;

    constructor(attributes?: Attributes) {
        if (attributes) {
            this._props = this.static.attributesToProps(attributes);
        }
    }

    static canAdd(child: BaseNode): boolean {
        return (this.childTypes.length > 0 && has(this.childTypes, child.static.nodeName)) ||
            (this.childGroups.length > 0 && !!this.childGroups.find(group => has(nodeGroups[group], child.static.nodeName)));
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

    protected get static(): typeof BaseNode {
        return this.constructor as typeof BaseNode;
    }

    get json(): Record<string, BasicValue> {
        return {
            nodeName: this.static.nodeName,
            ...this._props,
            children: this._children?.map(child => child.json),
        };
    }
    add(child: BaseNode, breakOnError = true): void {
        if (!this._children) {
            this._children = [];
        }
        if (!this.static.canAdd(child)) {
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
            throw new Error('unkown property "' + field + '"');
        }
        return this._props[field] as T;
    }
    writeProp<T = BasicValue>(field: string, value: T): void {
        if (this.static.fields.indexOf(field) < 0) {
            throw new Error('unkown property "' + field + '"');
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
    childGroups: Array<string> = [],

) {
    return (constructor: T): T => decorator(class extends constructor {
        static nodeName = nodeName;
        static fields = fields;
        static childTypes = childTypes;
        static childGroups = childGroups;
        static isValidField = fieldValidator;
    });
}

