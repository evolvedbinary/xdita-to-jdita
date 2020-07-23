/* eslint-disable @typescript-eslint/no-explicit-any */

import { CDATA, isCDATA, isOrUndefined, isNMTOKEN, Attributes, NMTOKEN } from "../utils";
import { BaseNode } from "./base";
import { PAttributes, PFields, isValidPField } from "../attributes/p";

export class PNode extends BaseNode implements PAttributes {
  static nodeName = 'dt';
  static childGroups = ['all-inline'];
  _props!: PAttributes;
  static fields = PFields;
  static isValidField = isValidPField;
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
