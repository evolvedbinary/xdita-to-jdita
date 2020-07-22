/* eslint-disable @typescript-eslint/no-explicit-any */

import { FiltersAttributes, isFiltersAttributes } from "../attributes/filters";
import { LocalizationAttributes, isLocalizationAttributes } from "../attributes/localization";
import { VariableContentAttributes, isVariableContentAttributes } from "../attributes/variable-content";
import { CDATA, isCDATA, isOrUndefined, isNMTOKEN, Attributes, NMTOKEN } from "../utils";
import { BaseNode } from "./base";

export interface DtAttributes extends FiltersAttributes, LocalizationAttributes, VariableContentAttributes {
  'outputClass'?: CDATA;
  'className'?: CDATA;
}
export const isDtAttributes = (value?: any): value is DtAttributes =>
  typeof value === 'object' &&
  isOrUndefined(isCDATA, value['outputClass']) &&
  isOrUndefined(isCDATA, value['className']) &&
  isFiltersAttributes(value) &&
  isLocalizationAttributes(value) &&
  isVariableContentAttributes(value);
export class DtNode extends BaseNode implements DtAttributes {
  static nodeName = 'dt';
  static childGroups = ['all-inline'];
  _props!: DtAttributes;
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
