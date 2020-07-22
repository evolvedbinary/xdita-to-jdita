/* eslint-disable @typescript-eslint/no-explicit-any */

import { LocalizationAttributes, isLocalizationAttributes } from "../attributes/localization";
import { CDATA, isCDATA, isOrUndefined, Attributes } from "../utils";
import { BaseNode } from "./base";

export interface IntTitle extends LocalizationAttributes {
  'outputClass'?: CDATA;
  'className'?: CDATA;
}
export const isIntTitle = (value?: any): value is IntTitle =>
  typeof value === 'object' &&
  isOrUndefined(isCDATA, value['outputClass']) &&
  isOrUndefined(isCDATA, value['className']) &&
  isLocalizationAttributes(value);
export class TitleNode extends BaseNode implements IntTitle {
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
