/* eslint-disable @typescript-eslint/no-explicit-any */

import { CDATA, isCDATA, isOrUndefined, isNMTOKEN, Attributes, NMTOKEN } from "../utils";
import { BaseNode } from "./base";
import { DlEntryAttributes, DlEntryFields } from "../attributes/dl-entry";

export class DlEntryNode extends BaseNode implements DlEntryAttributes {
    static nodeName = 'dlentry';
    static childTypes = ['dt', 'dd'];
    _props!: DlEntryAttributes;
    static fields = DlEntryFields;
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
