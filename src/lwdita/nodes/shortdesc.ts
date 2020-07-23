/* eslint-disable @typescript-eslint/no-explicit-any */

import { CDATA, isOrUndefined, isCDATA, Attributes } from "../utils";
import { BaseNode } from "./base";
import { ShortDescAttributes, ShortDescFields, isValidShortDescField } from "../attributes/shortdesc";

export class ShortDescNode extends BaseNode implements ShortDescAttributes {
  static nodeName = 'shortdesc';
  static fields = ShortDescFields;
  static childGroups = ['all-inline'];
  constructor(attributes?: Attributes) {
      super();
      this._props = this.attributesToProps(attributes);
  }
  static isValidField = isValidShortDescField;
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