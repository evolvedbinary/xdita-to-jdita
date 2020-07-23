/* eslint-disable @typescript-eslint/no-explicit-any */

import { CDATA, isCDATA, isOrUndefined, Attributes } from "../utils";
import { BaseNode } from "./base";
import { TitleAttributes, TitleFields, isValidTitleField } from "../attributes/title";

export class TitleNode extends BaseNode implements TitleAttributes {
  static nodeName = 'title';
  static childTypes = [];
  static childGroups = ['common-inline'];
  _props!: TitleAttributes;
  static fields = TitleFields;
  static isValidField = isValidTitleField;
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
