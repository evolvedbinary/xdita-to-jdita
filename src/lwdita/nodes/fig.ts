/* eslint-disable @typescript-eslint/no-explicit-any */

import { CDATA, Attributes, DisplayScale, DisplayFrame, DisplayExpanse } from "../utils";
import { BaseNode } from "./base";
import { FigAttributes, FigFields, isValidFigField } from "../attributes/fig";

export class FigNode extends BaseNode implements FigAttributes {
  static nodeName = 'fig';
  static childTypes = ['image', 'xref'];
  static childGroups = ['fig-blocks'];
  _props!: FigAttributes;
  static fields = FigFields;
  static isValidField = isValidFigField;
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
