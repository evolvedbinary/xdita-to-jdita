import { BaseNode, makeComponent } from "./base";
import { isOrUndefined } from "../utils";
import { BasicValue, JDita } from "../classes";

export const TextFields = ['content'];
export interface TextNode {
  readonly 'content'?: string;
}
export const isTextNode = (value?: BasicValue): value is TextNode => typeof value === 'object' && 'content' in value && typeof value.content === 'string';

export function isValidTextField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'content': return isOrUndefined(content => typeof content === 'string', value);
    default: return false;
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeText<T extends { new(...args: any[]): BaseNode }>(constructor: T): T {
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
  get json(): JDita {
    return {
      nodeName: this.static.nodeName,
      content: this._props['content'] as string,
  };
  }
  get pmJson(): Record<string, BasicValue> {
    return {
      type: 'text',
      text: this.content,
    };
  }
}
