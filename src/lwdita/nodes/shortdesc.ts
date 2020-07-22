/* eslint-disable @typescript-eslint/no-explicit-any */

import { CDATA, isOrUndefined, isCDATA, Attributes } from "../utils";
import { BaseNode } from "./base";
import { ShortDescAttributes } from "../attributes/shortdesc";

export class ShortdescNode extends BaseNode implements ShortDescAttributes {
  static nodeName = 'shortdesc';
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
  static childGroups = ['all-inline'];
  constructor(attributes?: Attributes) {
      super();
      this._props = this.attributesToProps(attributes);
  }
  isValidField(field: string, value: any): boolean {
      switch(field) {
          case 'props': return isOrUndefined(isCDATA, value);
          case 'dir': return isOrUndefined(isCDATA, value);
          case 'xml:lang': return isOrUndefined(isCDATA, value);
          case 'translate': return isOrUndefined(isCDATA, value);
          case 'id': return isOrUndefined(isCDATA, value);
          case 'conref': return isOrUndefined(isCDATA, value);
          case 'outputClass': return isOrUndefined(isCDATA, value);
          case 'className': return isOrUndefined(isCDATA, value);
          default: return false;
      }
  }
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