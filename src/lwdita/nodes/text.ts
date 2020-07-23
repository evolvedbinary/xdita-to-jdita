/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseNode } from "./base";
import { CDATA } from "../utils";
import { TextAttributes, TextFields } from "../attributes/text";
import { isValidTitleField } from "../attributes";

export class TextNode extends BaseNode implements TextAttributes {
  static nodeName = 'text';
  _props!: TextAttributes;
  static fields = TextFields;
  static isValidField = isValidTitleField;
  constructor(content: string) {
      super();
      this._props = this.attributesToProps({ content });
  }
  get 'content'(): CDATA | undefined {
      return this.readProp<CDATA>('content'); }
}
