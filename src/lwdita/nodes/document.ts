import { BaseNode } from "./base";

export class DocumentNode extends BaseNode {
  static nodeName = 'document';
  static childTypes = ['topic'];
  static fields = [];
  static isValidField = (): boolean => true;
  static get nodeType(): string {
    return 'doc';
  }
}
