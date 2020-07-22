/* eslint-disable @typescript-eslint/no-explicit-any */

import { FiltersAttributes, isFiltersAttributes } from "../attributes/filters";
import { LocalizationAttributes, isLocalizationAttributes } from "../attributes/localization";
import { ReuseAttributes, isReuseAttributes } from "../reuse";
import { CDATA, isCDATA, isOrUndefined, isNMTOKEN, Attributes, NMTOKEN } from "../utils";
import { BaseNode } from "./base";

export interface DlAttributes extends FiltersAttributes, LocalizationAttributes, ReuseAttributes {
  'outputClass'?: CDATA;
  'className'?: CDATA;
}
export const isDlAttributes = (value?: any): value is DlAttributes =>
  typeof value === 'object' &&
  isOrUndefined(isCDATA, value['outputClass']) &&
  isOrUndefined(isCDATA, value['className']) &&
  isFiltersAttributes(value) &&
  isLocalizationAttributes(value) &&
  isReuseAttributes(value);
export class DlNode extends BaseNode implements DlAttributes {
  static nodeName = 'dl';
  static childTypes = ['dlentry'];
  _props!: DlAttributes;
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
