/* eslint-disable @typescript-eslint/no-explicit-any */

import { isOrUndefined, NMTOKEN, CDATA, isCDATA, isNMTOKEN, Attributes } from "../utils";
import { BaseNode } from "./base";
import { ImageAttributes, ImageFields } from "../attributes/image";

export class ImageNode extends BaseNode implements ImageAttributes {
  static nodeName = 'image';
  static childTypes = ['alt'];
  _props!: ImageAttributes;
  static fields = ImageFields;
  static isValidField(field: string, value: any): boolean {
      switch(field) {
          case 'height': return isOrUndefined(isNMTOKEN, value);
          case 'width': return isOrUndefined(isNMTOKEN, value);
          case 'props': return isOrUndefined(isCDATA, value);
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