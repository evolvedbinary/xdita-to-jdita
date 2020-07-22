/* eslint-disable @typescript-eslint/no-explicit-any */

import { CDATA, isCDATA, isOrUndefined, Attributes, isDisplayScale, isDisplayFrame, isDisplayExpanse, DisplayScale, DisplayFrame, DisplayExpanse } from "../utils";
import { BaseNode } from "./base";
import { FigAttributes } from "../attributes/fig";

export class FigNode extends BaseNode implements FigAttributes {
  static nodeName = 'fig';
  static childTypes = ['image', 'xref'];
  static childGroups = ['fig-blocks'];
  _props!: FigAttributes;
  static fields = [
      'scale',
      'frame',
      'expanse',
      'dir',
      'xml:lang',
      'translate',
      'keyref',
      'outputClass',
      'className',
  ];
  static isValidField(field: string, value: any): boolean {
      switch(field) {
          case 'scale': return isOrUndefined(isDisplayScale, value);
          case 'frame': return isOrUndefined(isDisplayFrame, value);
          case 'expanse': return isOrUndefined(isDisplayExpanse, value);
          case 'dir': return isOrUndefined(isCDATA, value);
          case 'xml:lang': return isOrUndefined(isCDATA, value);
          case 'translate': return isOrUndefined(isCDATA, value);
          case 'keyref': return isOrUndefined(isCDATA, value);
          case 'outputClass': return isOrUndefined(isCDATA, value);
          case 'className': return isOrUndefined(isCDATA, value);
          default: return false;
      }
  }
  constructor(attributes?: Attributes) {
      super();
      this._props = this.attributesToProps(attributes);
  }
  get 'scale'(): DisplayScale | undefined {
      return this.readProp<DisplayScale>('scale'); }
  get 'frame'(): DisplayFrame | undefined {
      return this.readProp<DisplayFrame>('frame'); }
  get 'expanse'(): DisplayExpanse | undefined {
      return this.readProp<DisplayExpanse>('expanse'); }
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
