/* eslint-disable @typescript-eslint/no-explicit-any */

import { CDATA, isCDATA, isOrUndefined, Attributes } from "../utils";
import { BaseNode } from "./base";
import { PhAttributes, PhFields, isValidPhField } from "../attributes/ph";

export class PhNode extends BaseNode implements PhAttributes {
  static nodeName = 'ph';
  static childGroups = ['all-inline'];
  _props!: PhAttributes;
  static fields = PhFields;
  static isValidField = isValidPhField;
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
