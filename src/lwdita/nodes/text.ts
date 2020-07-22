/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseNode } from "./base";
import { CDATA } from "../utils";

export interface IntTextNode {
  'content'?: string;
}
export const isIntTextNode = (value?: any): value is IntTextNode => typeof value === 'object' && typeof value.content === 'string';
export class TextNode extends BaseNode implements IntTextNode {
  static nodeName = 'text';
  _props!: IntTextNode;
  static fields = [
      'content',
  ];
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
