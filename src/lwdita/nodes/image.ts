/* eslint-disable @typescript-eslint/no-explicit-any */

import { isOrUndefined, NMTOKEN, CDATA, isCDATA, isNMTOKEN, Attributes } from "../utils";
import { BaseNode } from "./base";
import { ImageAttributes, ImageFields, isValidImageField } from "../attributes/image";

export class ImageNode extends BaseNode implements ImageAttributes {
  static nodeName = 'image';
  static childTypes = ['alt'];
  _props!: ImageAttributes;
  static fields = ImageFields;
  static isValidField = isValidImageField;
  constructor(attributes?: Attributes) {
      super();
      this._props = this.attributesToProps(attributes);
  }
  get 'height'(): NMTOKEN | undefined {
      return this.readProp<NMTOKEN>('height'); }
  get 'width'(): NMTOKEN | undefined {
      return this.readProp<NMTOKEN>('width'); }
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