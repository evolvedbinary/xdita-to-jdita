import { BaseNode, makeComponent } from "./base";
import { isOrUndefined, Attributes } from "../utils";

export const TextFields = ['content'];
export interface TextNode {
  readonly 'content'?: string;
}
export const isTextNode = (value?: any): value is TextNode => typeof value === 'object' && typeof value.content === 'string';

export function isValidTextField(field: string, value: any): boolean {
  switch(field) {
    case 'content': return isOrUndefined(content => typeof content === 'string', value);
    default: return false;
  }
}
export function makeText<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return class extends constructor implements TextNode {
      get 'content'(): string {
        return this.readProp('content');
      }
      set 'content'(value: string) {
        this.writeProp('content', value);
      }
  }
}

@makeComponent(makeText, 'text', isValidTextField, TextFields)
export class TextNode extends BaseNode {
  constructor(content: string) {
    super({ content });
  }
}
