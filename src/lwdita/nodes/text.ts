/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseNode } from "./base";
import { CDATA } from "../utils";
import { TextAttributes, TextFields } from "../attributes/text";

export class TextNode extends BaseNode implements TextAttributes {
  static nodeName = 'text';
  _props!: TextAttributes;
  static fields = TextFields;
  static isValidField(field: string, value: any): boolean {
      switch(field) {
          case 'content': return typeof value === 'string';
          default: return false;
      }
  }
  constructor(content: string) {
      super();
      this._props = this.attributesToProps({ content });
  }
  get 'content'(): CDATA | undefined {
      return this.readProp<CDATA>('content'); }
}
