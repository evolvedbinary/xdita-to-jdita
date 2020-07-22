/* eslint-disable @typescript-eslint/no-explicit-any */

import { CDATA, isCDATA, isOrUndefined, isNMTOKEN, Attributes, NMTOKEN } from "../utils";
import { BaseNode } from "./base";
import { BodyAttributes } from "../attributes/body";

export class BodyNode extends BaseNode implements BodyAttributes {
  static nodeName = 'body';
  static childTypes = ['section', 'fn'];
  static childGroups = ['list-blocks'];
  _props!: BodyAttributes;
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
