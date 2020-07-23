/* eslint-disable @typescript-eslint/no-explicit-any */

import { CDATA, Attributes, NMTOKEN } from "../utils";
import { BaseNode } from "./base";
import { BodyAttributes, BodyFields, isValidBodyField } from "../attributes/body";

export class BodyNode extends BaseNode implements BodyAttributes {
  static nodeName = 'body';
  static childTypes = ['section', 'fn'];
  static childGroups = ['list-blocks'];
  _props!: BodyAttributes;
  static fields = BodyFields;
  static isValidField = isValidBodyField;
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
