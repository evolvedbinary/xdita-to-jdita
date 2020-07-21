/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { SaxesAttributeNS } from "saxes";

type Class<T> = new (...args: any[]) => T;

export const has = (array: Array<any>, value: any): boolean => array.indexOf(value) >= 0;

export function isOrUndefined<T>(check: (value?: any) => boolean, value?: any): value is T | undefined {
    return typeof value ==='undefined' || check(value);
}

// TODO(AR) can we further refine these types?
export type ID = string;
export const isID = (value?: any): value is ID =>  typeof value ==='string';
export type CDATA = string;
export const isCDATA = (value?: any): value is CDATA =>  typeof value ==='string';
export type PCDATA = string;
export const isPCDATA = (value?: any): value is PCDATA =>  typeof value ==='string';
export type NMTOKEN = string;
export const isNMTOKEN = (value?: any): value is NMTOKEN =>  typeof value ==='string';

// TODO(AR) should these be union types, or should they be base interfaces which other interfaces like `ph` inherit from?
export type RefrenceContentScope = 'local' | 'peer' | 'external';
export const isReferenceContentScope = (value?: any): value is RefrenceContentScope =>
    has(['local', 'peer', 'external'], value);
export const nodeGroups: Record<string, Array<string>> = {
    'common-inline': ['text', 'ph', 'image', 'data'],
    'all-inline'   : ['text', 'ph', 'image', 'xref', 'data'],
    'simple-blocks': ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'fn', 'note', 'data'],
    'fn-blocks'    : ['p', 'ul', 'ol', 'dl', 'data'],
    'all-blocks'   : ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'simpletable', 'fig', 'fn', 'note', 'data'],
    'list-blocks'  : ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'simpletable', 'fig', 'note', 'data'],
    'fig-blocks'   : ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'simpletable', 'data'],
}
export type CommonInline = PCDATA | IntPh /* | IntXImage | IntData*/;
export const isCommonInline = (value?: any): value is CommonInline => isPCDATA(value) || isIntPh(value);
export type AllInline = CommonInline/* | XRef*/;
export const isAllInline = (value?: any): value is AllInline => isCommonInline(value);

type Attributes = Record<string, SaxesAttributeNS> | Record<string, string>;
export abstract class BaseElement {
    static nodeName = 'node';
    static fields: Array<string>;
    static childTypes: Array<string> = [];
    static childGroups: Array<string> = [];
    protected _children: BaseElement[] = [];
    protected _props!: Record<string, any>;
    protected get static(): typeof BaseElement {
        return this.constructor as any;
    }
    get json(): Record<string, any> {
        return {
            nodeName: this.static.nodeName,
            ...this._props,
            children: this._children.map(child => child.json),
        };
    }
    static canAdd(child: BaseElement): boolean {
        return (this.childTypes.length > 0 && has(this.childTypes, child.static.nodeName)) ||
            (this.childGroups.length > 0 && !!this.childGroups.find(group => has(nodeGroups[group], child.static.nodeName)));
    }
    add(child: BaseElement, breakOnError = true): void {
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
    protected attributesToProps<T = Record<string, any>>(attributes: Attributes = {}): T {
        const result: Record<string, any> = {};
        this.static.fields.forEach(field => {
            const attr = attributes[field];
            result[field] = typeof attr === 'string' ? attr : attr?.value;
        });
        return result as T;
    }
    readProp<T = any>(field: string): T {
        if (this.static.fields.indexOf(field) < 0) {
            throw new Error('unkown property "' + field + '"');
        }
        return this._props[field];
    }
    writeProp<T = any>(field: string, value: T): void {
        if (this.static.fields.indexOf(field) < 0) {
            throw new Error('unkown property "' + field + '"');
        }
        if (!this.static.isValidField(field, value)) {
            throw new Error('wrong property  type "' + typeof(value) + '" for field"' + field + '"');
        }
        this._props[field] = value;
    }
    static isValidField(field: string, value: any): boolean {
        return true;
    }
}

export interface IntTextNode {
    'content'?: string;
}
export const isIntTextNode = (value?: any): value is IntTextNode => typeof value === 'object' && typeof value.content === 'string';
export class TextNode extends BaseElement implements IntTextNode {
    static nodeName = 'text';
    _props!: IntTextNode;
    static fields = [
        'content',
    ];
    static isValidField(field: string, value: any): boolean {
        switch(field) {
            case 'content': return typeof value === 'string';
            default: return false;
        }
    }
    constructor(content: string) {
        super();
        this._props = this.attributesToProps({ content });
    }
    get 'content'(): CDATA | undefined {
        return this.readProp<CDATA>('content'); }
}


export class DocumentNode extends BaseElement {
    static nodeName = 'document';
    static childTypes = ['topic'];
    topic?: Topic;
    static fields = [];
    static isValidField = (): boolean => true;
    constructor() {
        super();
    }
}

export interface IntNamedElement {
    readonly 'elementName': string;
}

export type IntFilterAdds = {};

export interface IntFilters extends IntFilterAdds {
    props?: CDATA;
}
export const isIntFilters = (value?: any): value is IntFilters =>
    typeof value === 'object' &&
    isOrUndefined(isCDATA, value['props']);

export interface IntReuse {
    id?: NMTOKEN;
    conref?: CDATA;
}
export const isIntReuse = (value?: any): value is IntReuse =>
    isOrUndefined(isCDATA, value['id']) &&
    isOrUndefined(isCDATA, value['conref']);
    
export interface IntReferenceContent {
    href?: CDATA;
    format?: CDATA;
    scope?: RefrenceContentScope;
}
export const isIntReferenceContent = (value?: any): value is IntReferenceContent =>
    isOrUndefined(isCDATA, value['href']) &&
    isOrUndefined(isCDATA, value['format']) &&
    isOrUndefined(isReferenceContentScope, value['scope']);
    
export interface IntVariableContent {
    keyref?: CDATA;
}
export const isIntVariableContent = (value?: any): value is IntVariableContent =>
    typeof value === 'object' &&
    isOrUndefined(isCDATA, value['keyref']);

export interface IntVariableLinks {
    keyref: CDATA;
}

export interface IntLocalization {
    'dir'?: CDATA;
    'xml:lang'?: CDATA;
    'translate'?: CDATA;
}
export const isIntLocalization = (value?: any): value is IntLocalization =>
    typeof value === 'object' &&
    isOrUndefined(isCDATA, value['dir']) &&
    isOrUndefined(isCDATA, value['xml:lang']) &&
    isOrUndefined(isCDATA, value['translate']);

export interface IntTopic extends IntNamedElement, IntLocalization {
    'id': ID;
    'xmlns:ditaarch': CDATA;
    'ditaarch:DITAArchVersion'?: CDATA;
    'domains'?: CDATA;
    'outputClass'?: CDATA;
    'className'?: CDATA;
}
export const isIntTopic = (value?: any): value is IntTopic =>
    typeof value === 'object' &&
    isID(value['id']) &&
    isCDATA(value['xmlns:ditaarch']) &&
    isOrUndefined(isCDATA, value['ditaarch:DITAArchVersion']) &&
    isOrUndefined(isCDATA, value['domains']) &&
    isOrUndefined(isCDATA, value['outputClass']) &&
    isOrUndefined(isCDATA, value['className']) &&
    isIntLocalization(value);

export class Topic extends BaseElement implements IntTopic {
    static nodeName = 'topic';
    static childTypes = ['title', 'shortdesc', 'prolog', 'body'];
    elementName = 'topic';
    _props!: IntTopic;
    static fields = [
        'dir',
        'xml:lang',
        'translate',
        'id',
        'xmlns:ditaarch',
        'ditaarch:DITAArchVersion',
        'domains',
        'outputClass',
        'className',
    ];
    static isValidField(field: string, value: any): boolean {
        switch(field) {
            case 'dir': return isOrUndefined(isCDATA, value);
            case 'xml:lang': return isOrUndefined(isCDATA, value);
            case 'translate': return isOrUndefined(isCDATA, value);
            case 'id': return isID(value);
            case 'xmlns:ditaarch': return isCDATA(value);
            case 'ditaarch:DITAArchVersion': return isOrUndefined(isCDATA, value);
            case 'domains': return isOrUndefined(isCDATA, value);
            case 'outputClass': return isOrUndefined(isCDATA, value);
            case 'className': return isOrUndefined(isCDATA, value);
            default: return false;
        }
    }
    constructor(attributes: Attributes){
        super();
        this._props = this.attributesToProps(attributes);
    }
    get 'dir'(): CDATA {
        return this.readProp<CDATA>('dir'); }
    get 'xml:lang'(): CDATA {
        return this.readProp<CDATA>('xml:lang'); }
    get 'translate'(): CDATA | undefined {
        return this.readProp<CDATA>('translate'); }
    get 'id'(): ID {
        return this.readProp<ID>('id'); }
    get 'xmlns:ditaarch'(): CDATA {
        return this.readProp<CDATA>('xmlns:ditaarch'); }
    get 'ditaarch:DITAArchVersion'(): CDATA | undefined {
        return this.readProp<CDATA>('ditaarch:DITAArchVersion'); }
    get 'domains'(): CDATA | undefined {
        return this.readProp<CDATA>('domains'); }
    get 'outputClass'(): CDATA | undefined {
        return this.readProp<CDATA>('outputClass'); }
    get 'className'(): CDATA | undefined {
        return this.readProp<CDATA>('className'); }

}

export interface IntTitle extends IntLocalization {
    'outputClass'?: CDATA;
    'className'?: CDATA;
}
export const isIntTitle = (value?: any): value is IntTitle =>
    typeof value === 'object' &&
    isID(value['id']) &&
    isCDATA(value['xmlns:ditaarch']) &&
    isOrUndefined(isCDATA, value['outputClass']) &&
    isOrUndefined(isCDATA, value['className']) &&
    isIntLocalization(value);
export class Title extends BaseElement implements IntTitle {
    static nodeName = 'title';
    static childTypes = [];
    static childGroups = ['common-inline'];
    _props!: IntTitle;
    static fields = [
        'dir',
        'xml:lang',
        'translate',
        'outputClass',
        'className',
    ];
    static isValidField(field: string, value: any): boolean {
        switch(field) {
            case 'dir': return isOrUndefined(isCDATA, value);
            case 'xml:lang': return isOrUndefined(isCDATA, value);
            case 'translate': return isOrUndefined(isCDATA, value);
            case 'outputClass': return isOrUndefined(isCDATA, value);
            case 'className': return isOrUndefined(isCDATA, value);
            default: return false;
        }
    }
    constructor(attributes?: Attributes) {
        super();
        this._props = this.attributesToProps(attributes);
    }
    get 'dir'(): CDATA | undefined {
        return this.readProp<CDATA>('dir'); }
    get 'xml:lang'(): CDATA | undefined {
        return this.readProp<CDATA>('xml:lang'); }
    get 'translate'(): CDATA | undefined {
        return this.readProp<CDATA>('translate'); }
    get 'outputClass'(): CDATA | undefined {
        return this.readProp<CDATA>('outputClass'); }
    get 'className'(): CDATA | undefined {
        return this.readProp<CDATA>('className'); }
}

export interface IntShortDesc extends IntFilters, IntLocalization, IntReuse {
    'props'?: CDATA;
    'dir'?: CDATA;
    'xml:lang'?: CDATA;
    'translate'?: CDATA;
    'id'?: NMTOKEN;
    'conref'?: CDATA;
    'outputClass'?: CDATA;
    'className'?: CDATA;
    // 'children': Array<AllInline>;
}
export const isIntShortDesc = (value?: any): value is IntShortDesc =>
    isOrUndefined(isCDATA, value['outputClass']) &&
    isOrUndefined(isCDATA, value['className']) &&
    isIntLocalization(value) &&
    isIntFilters(value) &&
    isIntReuse(value);
export class ShortDesc extends BaseElement implements IntShortDesc {
    static nodeName = 'shortdesc';
    static fields = [
        'props',
        'dir',
        'xml:lang',
        'translate',
        'id',
        'conref',
        'outputClass',
        'className',
    ];
    static childGroups = ['all-inline'];
    constructor(attributes?: Attributes) {
        super();
        this._props = this.attributesToProps(attributes);
    }
    isValidField(field: string, value: any): boolean {
        switch(field) {
            case 'props': return isOrUndefined(isCDATA, value);
            case 'dir': return isOrUndefined(isCDATA, value);
            case 'xml:lang': return isOrUndefined(isCDATA, value);
            case 'translate': return isOrUndefined(isCDATA, value);
            case 'id': return isOrUndefined(isCDATA, value);
            case 'conref': return isOrUndefined(isCDATA, value);
            case 'outputClass': return isOrUndefined(isCDATA, value);
            case 'className': return isOrUndefined(isCDATA, value);
            default: return false;
        }
    }
    get 'props'(): CDATA | undefined {
        return this.readProp<CDATA>('props'); }
    get 'dir'(): CDATA | undefined {
        return this.readProp<CDATA>('dir'); }
    get 'xml:lang'(): CDATA | undefined {
        return this.readProp<CDATA>('xml:lang'); }
    get 'translate'(): CDATA | undefined {
        return this.readProp<CDATA>('translate'); }
    get 'id'(): CDATA | undefined {
        return this.readProp<CDATA>('id'); }
    get 'conref'(): CDATA | undefined {
        return this.readProp<CDATA>('conref'); }
    get 'outputClass'(): CDATA | undefined {
        return this.readProp<CDATA>('outputClass'); }
    get 'className'(): CDATA | undefined {
        return this.readProp<CDATA>('className'); }
}

export interface IntPh extends IntFilters, IntLocalization, IntVariableContent {
    'outputClass'?: CDATA;
    'className'?: CDATA;
}
export const isIntPh = (value?: any): value is IntPh =>
    typeof value === 'object' &&
    isOrUndefined(isCDATA, value['outputClass']) &&
    isOrUndefined(isCDATA, value['className']) &&
    isIntFilters(value) &&
    isIntLocalization(value) &&
    isIntVariableContent(value);
export class Ph extends BaseElement implements IntPh {
    static nodeName = 'ph';
    static childGroups = ['all-inline'];
    _props!: IntPh;
    static fields = [
        'props',
        'dir',
        'xml:lang',
        'translate',
        'keyref',
        'outputClass',
        'className',
    ];
    static isValidField(field: string, value: any): boolean {
        switch(field) {
            case 'props': return isOrUndefined(isCDATA, value);
            case 'dir': return isOrUndefined(isCDATA, value);
            case 'xml:lang': return isOrUndefined(isCDATA, value);
            case 'translate': return isOrUndefined(isCDATA, value);
            case 'keyref': return isOrUndefined(isCDATA, value);
            case 'outputClass': return isOrUndefined(isCDATA, value);
            case 'className': return isOrUndefined(isCDATA, value);
            default: return false;
        }
    }
    constructor(attributes?: Attributes) {
        super();
        this._props = this.attributesToProps(attributes);
    }
    get 'props'(): CDATA | undefined {
        return this.readProp<CDATA>('props'); }
    get 'dir'(): CDATA | undefined {
        return this.readProp<CDATA>('dir'); }
    get 'xml:lang'(): CDATA | undefined {
        return this.readProp<CDATA>('xml:lang'); }
    get 'translate'(): CDATA | undefined {
        return this.readProp<CDATA>('translate'); }
    get 'keyref'(): CDATA | undefined {
        return this.readProp<CDATA>('keyref'); }
    get 'outputClass'(): CDATA | undefined {
        return this.readProp<CDATA>('outputClass'); }
    get 'className'(): CDATA | undefined {
        return this.readProp<CDATA>('className'); }
}

export interface IntDL extends IntFilters, IntLocalization, IntReuse {
    'outputClass'?: CDATA;
    'className'?: CDATA;
}
export const isIntDL = (value?: any): value is IntDL =>
    typeof value === 'object' &&
    isOrUndefined(isCDATA, value['outputClass']) &&
    isOrUndefined(isCDATA, value['className']) &&
    isIntFilters(value) &&
    isIntLocalization(value) &&
    isIntReuse(value);
export class DL extends BaseElement implements IntDL {
    static nodeName = 'dl';
    static childTypes = ['dlentry'];
    _props!: IntDL;
    static fields = [
        'props',
        'dir',
        'xml:lang',
        'translate',
        'id',
        'conref',
        'outputClass',
        'className',
    ];
    static isValidField(field: string, value: any): boolean {
        switch(field) {
            case 'props': return isOrUndefined(isCDATA, value);
            case 'dir': return isOrUndefined(isCDATA, value);
            case 'xml:lang': return isOrUndefined(isCDATA, value);
            case 'translate': return isOrUndefined(isCDATA, value);
            case 'id': return isOrUndefined(isNMTOKEN, value);
            case 'conref': return isOrUndefined(isCDATA, value);
            case 'outputClass': return isOrUndefined(isCDATA, value);
            case 'className': return isOrUndefined(isCDATA, value);
            default: return false;
        }
    }
    constructor(attributes?: Attributes) {
        super();
        this._props = this.attributesToProps(attributes);
    }
    get 'props'(): CDATA | undefined {
        return this.readProp<CDATA>('props'); }
    get 'dir'(): CDATA | undefined {
        return this.readProp<CDATA>('dir'); }
    get 'xml:lang'(): CDATA | undefined {
        return this.readProp<CDATA>('xml:lang'); }
    get 'translate'(): CDATA | undefined {
        return this.readProp<CDATA>('translate'); }
    get 'id'(): NMTOKEN | undefined {
        return this.readProp<NMTOKEN>('id'); }
    get 'conref'(): CDATA | undefined {
        return this.readProp<CDATA>('conref'); }
    get 'outputClass'(): CDATA | undefined {
        return this.readProp<CDATA>('outputClass'); }
    get 'className'(): CDATA | undefined {
        return this.readProp<CDATA>('className'); }
}

export interface IntDLEntry extends IntFilters, IntLocalization, IntVariableContent {
    'outputClass'?: CDATA;
    'className'?: CDATA;
}
export const isIntDLEntry = (value?: any): value is IntDLEntry =>
    typeof value === 'object' &&
    isOrUndefined(isCDATA, value['outputClass']) &&
    isOrUndefined(isCDATA, value['className']) &&
    isIntFilters(value) &&
    isIntLocalization(value) &&
    isIntVariableContent(value);
export class DLEntry extends BaseElement implements IntDLEntry {
    static nodeName = 'dlentry';
    static childTypes = ['dt', 'dd'];
    _props!: IntDLEntry;
    static fields = [
        'props',
        'dir',
        'xml:lang',
        'translate',
        'keyref',
        'outputClass',
        'className',
    ];
    static isValidField(field: string, value: any): boolean {
        switch(field) {
            case 'props': return isOrUndefined(isCDATA, value);
            case 'dir': return isOrUndefined(isCDATA, value);
            case 'xml:lang': return isOrUndefined(isCDATA, value);
            case 'translate': return isOrUndefined(isCDATA, value);
            case 'id': return isOrUndefined(isNMTOKEN, value);
            case 'conref': return isOrUndefined(isCDATA, value);
            case 'outputClass': return isOrUndefined(isCDATA, value);
            case 'className': return isOrUndefined(isCDATA, value);
            default: return false;
        }
    }
    constructor(attributes?: Attributes) {
        super();
        this._props = this.attributesToProps(attributes);
    }
    get 'props'(): CDATA | undefined {
        return this.readProp<CDATA>('props'); }
    get 'dir'(): CDATA | undefined {
        return this.readProp<CDATA>('dir'); }
    get 'xml:lang'(): CDATA | undefined {
        return this.readProp<CDATA>('xml:lang'); }
    get 'translate'(): CDATA | undefined {
        return this.readProp<CDATA>('translate'); }
    get 'id'(): NMTOKEN | undefined {
        return this.readProp<NMTOKEN>('id'); }
    get 'conref'(): CDATA | undefined {
        return this.readProp<CDATA>('conref'); }
    get 'outputClass'(): CDATA | undefined {
        return this.readProp<CDATA>('outputClass'); }
    get 'className'(): CDATA | undefined {
        return this.readProp<CDATA>('className'); }
}

export interface IntBody extends IntLocalization {
    'outputClass'?: CDATA;
    'className'?: CDATA;
}
export const isIntBody = (value?: any): value is IntBody =>
    typeof value === 'object' &&
    isOrUndefined(isCDATA, value['outputClass']) &&
    isOrUndefined(isCDATA, value['className']) &&
    isIntLocalization(value);
export class Body extends BaseElement implements IntBody {
    static nodeName = 'body';
    static childTypes = ['section', 'fn'];
    static childGroups = ['list-blocks'];
    _props!: IntBody;
    static fields = [
        'xml:lang',
        'translate',
        'keyref',
        'outputClass',
        'className',
    ];
    static isValidField(field: string, value: any): boolean {
        switch(field) {
            case 'xml:lang': return isOrUndefined(isCDATA, value);
            case 'translate': return isOrUndefined(isCDATA, value);
            case 'id': return isOrUndefined(isNMTOKEN, value);
            case 'conref': return isOrUndefined(isCDATA, value);
            case 'outputClass': return isOrUndefined(isCDATA, value);
            case 'className': return isOrUndefined(isCDATA, value);
            default: return false;
        }
    }
    constructor(attributes?: Attributes) {
        super();
        this._props = this.attributesToProps(attributes);
    }
    get 'xml:lang'(): CDATA | undefined {
        return this.readProp<CDATA>('xml:lang'); }
    get 'translate'(): CDATA | undefined {
        return this.readProp<CDATA>('translate'); }
    get 'id'(): NMTOKEN | undefined {
        return this.readProp<NMTOKEN>('id'); }
    get 'conref'(): CDATA | undefined {
        return this.readProp<CDATA>('conref'); }
    get 'outputClass'(): CDATA | undefined {
        return this.readProp<CDATA>('outputClass'); }
    get 'className'(): CDATA | undefined {
        return this.readProp<CDATA>('className'); }
}

export interface IntDT extends IntFilters, IntLocalization, IntVariableContent {
    'outputClass'?: CDATA;
    'className'?: CDATA;
}
export const isIntDT = (value?: any): value is IntDT =>
    typeof value === 'object' &&
    isOrUndefined(isCDATA, value['outputClass']) &&
    isOrUndefined(isCDATA, value['className']) &&
    isIntFilters(value) &&
    isIntLocalization(value) &&
    isIntVariableContent(value);
export class DT extends BaseElement implements IntDT {
    static nodeName = 'dt';
    static childGroups = ['all-inline'];
    _props!: IntDT;
    static fields = [
        'props',
        'dir',
        'xml:lang',
        'translate',
        'keyref',
        'outputClass',
        'className',
    ];
    static isValidField(field: string, value: any): boolean {
        switch(field) {
            case 'props': return isOrUndefined(isCDATA, value);
            case 'dir': return isOrUndefined(isCDATA, value);
            case 'xml:lang': return isOrUndefined(isCDATA, value);
            case 'translate': return isOrUndefined(isCDATA, value);
            case 'id': return isOrUndefined(isNMTOKEN, value);
            case 'conref': return isOrUndefined(isCDATA, value);
            case 'outputClass': return isOrUndefined(isCDATA, value);
            case 'className': return isOrUndefined(isCDATA, value);
            default: return false;
        }
    }
    constructor(attributes?: Attributes) {
        super();
        this._props = this.attributesToProps(attributes);
    }
    get 'props'(): CDATA | undefined {
        return this.readProp<CDATA>('props'); }
    get 'dir'(): CDATA | undefined {
        return this.readProp<CDATA>('dir'); }
    get 'xml:lang'(): CDATA | undefined {
        return this.readProp<CDATA>('xml:lang'); }
    get 'translate'(): CDATA | undefined {
        return this.readProp<CDATA>('translate'); }
    get 'id'(): NMTOKEN | undefined {
        return this.readProp<NMTOKEN>('id'); }
    get 'conref'(): CDATA | undefined {
        return this.readProp<CDATA>('conref'); }
    get 'outputClass'(): CDATA | undefined {
        return this.readProp<CDATA>('outputClass'); }
    get 'className'(): CDATA | undefined {
        return this.readProp<CDATA>('className'); }
}

export interface IntDD extends IntFilters, IntLocalization, IntVariableContent {
    'outputClass'?: CDATA;
    'className'?: CDATA;
}
export const isIntDD = (value?: any): value is IntDD =>
    typeof value === 'object' &&
    isOrUndefined(isCDATA, value['outputClass']) &&
    isOrUndefined(isCDATA, value['className']) &&
    isIntFilters(value) &&
    isIntLocalization(value) &&
    isIntVariableContent(value);
export class DD extends BaseElement implements IntDD {
    static nodeName = 'dd';
    static childGroups = ['list-blocks'];
    _props!: IntDD;
    static fields = [
        'props',
        'dir',
        'xml:lang',
        'translate',
        'keyref',
        'outputClass',
        'className',
    ];
    static isValidField(field: string, value: any): boolean {
        switch(field) {
            case 'props': return isOrUndefined(isCDATA, value);
            case 'dir': return isOrUndefined(isCDATA, value);
            case 'xml:lang': return isOrUndefined(isCDATA, value);
            case 'translate': return isOrUndefined(isCDATA, value);
            case 'id': return isOrUndefined(isNMTOKEN, value);
            case 'conref': return isOrUndefined(isCDATA, value);
            case 'outputClass': return isOrUndefined(isCDATA, value);
            case 'className': return isOrUndefined(isCDATA, value);
            default: return false;
        }
    }
    constructor(attributes?: Attributes) {
        super();
        this._props = this.attributesToProps(attributes);
    }
    get 'props'(): CDATA | undefined {
        return this.readProp<CDATA>('props'); }
    get 'dir'(): CDATA | undefined {
        return this.readProp<CDATA>('dir'); }
    get 'xml:lang'(): CDATA | undefined {
        return this.readProp<CDATA>('xml:lang'); }
    get 'translate'(): CDATA | undefined {
        return this.readProp<CDATA>('translate'); }
    get 'id'(): NMTOKEN | undefined {
        return this.readProp<NMTOKEN>('id'); }
    get 'conref'(): CDATA | undefined {
        return this.readProp<CDATA>('conref'); }
    get 'outputClass'(): CDATA | undefined {
        return this.readProp<CDATA>('outputClass'); }
    get 'className'(): CDATA | undefined {
        return this.readProp<CDATA>('className'); }
}

export interface IntP extends IntFilters, IntLocalization, IntVariableContent {
    'outputClass'?: CDATA;
    'className'?: CDATA;
}
export const isIntP = (value?: any): value is IntP =>
    typeof value === 'object' &&
    isOrUndefined(isCDATA, value['outputClass']) &&
    isOrUndefined(isCDATA, value['className']) &&
    isIntFilters(value) &&
    isIntLocalization(value) &&
    isIntVariableContent(value);
export class Paragraph extends BaseElement implements IntP {
    static nodeName = 'p';
    static childGroups = ['all-inline'];
    _props!: IntP;
    static fields = [
        'props',
        'dir',
        'xml:lang',
        'translate',
        'keyref',
        'outputClass',
        'className',
    ];
    static isValidField(field: string, value: any): boolean {
        switch(field) {
            case 'props': return isOrUndefined(isCDATA, value);
            case 'dir': return isOrUndefined(isCDATA, value);
            case 'xml:lang': return isOrUndefined(isCDATA, value);
            case 'translate': return isOrUndefined(isCDATA, value);
            case 'id': return isOrUndefined(isNMTOKEN, value);
            case 'conref': return isOrUndefined(isCDATA, value);
            case 'outputClass': return isOrUndefined(isCDATA, value);
            case 'className': return isOrUndefined(isCDATA, value);
            default: return false;
        }
    }
    constructor(attributes?: Attributes) {
        super();
        this._props = this.attributesToProps(attributes);
    }
    get 'props'(): CDATA | undefined {
        return this.readProp<CDATA>('props'); }
    get 'dir'(): CDATA | undefined {
        return this.readProp<CDATA>('dir'); }
    get 'xml:lang'(): CDATA | undefined {
        return this.readProp<CDATA>('xml:lang'); }
    get 'translate'(): CDATA | undefined {
        return this.readProp<CDATA>('translate'); }
    get 'id'(): NMTOKEN | undefined {
        return this.readProp<NMTOKEN>('id'); }
    get 'conref'(): CDATA | undefined {
        return this.readProp<CDATA>('conref'); }
    get 'outputClass'(): CDATA | undefined {
        return this.readProp<CDATA>('outputClass'); }
    get 'className'(): CDATA | undefined {
        return this.readProp<CDATA>('className'); }
}

export interface IntImage extends IntFilters, IntLocalization, IntVariableContent, IntReferenceContent {
    'height'?: NMTOKEN;
    'width'?: NMTOKEN;
    'outputClass'?: CDATA;
    'className'?: CDATA;
}
export const isIntImage = (value?: any): value is IntImage =>
    typeof value === 'object' &&
    isOrUndefined(isCDATA, value['outputClass']) &&
    isOrUndefined(isCDATA, value['className']) &&
    isIntFilters(value) &&
    isIntLocalization(value) &&
    isIntVariableContent(value);
export class ImageNode extends BaseElement implements IntImage {
    static nodeName = 'image';
    static childTypes = ['alt'];
    _props!: IntImage;
    static fields = [
        'height',
        'width',
        'dir',
        'dir',
        'xml:lang',
        'translate',
        'keyref',
        'outputClass',
        'className',
    ];
    static isValidField(field: string, value: any): boolean {
        switch(field) {
            case 'height': return isOrUndefined(isNMTOKEN, value);
            case 'width': return isOrUndefined(isNMTOKEN, value);
            case 'props': return isOrUndefined(isCDATA, value);
            case 'dir': return isOrUndefined(isCDATA, value);
            case 'xml:lang': return isOrUndefined(isCDATA, value);
            case 'translate': return isOrUndefined(isCDATA, value);
            case 'keyref': return isOrUndefined(isCDATA, value);
            case 'outputClass': return isOrUndefined(isCDATA, value);
            case 'className': return isOrUndefined(isCDATA, value);
            default: return false;
        }
    }
    constructor(attributes?: Attributes) {
        super();
        this._props = this.attributesToProps(attributes);
    }
    get 'height'(): NMTOKEN | undefined {
        return this.readProp<NMTOKEN>('height'); }
    get 'width'(): NMTOKEN | undefined {
        return this.readProp<NMTOKEN>('width'); }
    get 'props'(): CDATA | undefined {
        return this.readProp<CDATA>('props'); }
    get 'dir'(): CDATA | undefined {
        return this.readProp<CDATA>('dir'); }
    get 'xml:lang'(): CDATA | undefined {
        return this.readProp<CDATA>('xml:lang'); }
    get 'translate'(): CDATA | undefined {
        return this.readProp<CDATA>('translate'); }
    get 'keyref'(): CDATA | undefined {
        return this.readProp<CDATA>('keyref'); }
    get 'outputClass'(): CDATA | undefined {
        return this.readProp<CDATA>('outputClass'); }
    get 'className'(): CDATA | undefined {
        return this.readProp<CDATA>('className'); }
}
