import { BaseNode } from "./base";
import { stringsToChildTypes } from "../utils";

export class DocumentNode extends BaseNode {
  static nodeName = 'document';
  static childTypes = stringsToChildTypes(['topic']);
  static fields = [];
  static isValidField = (): boolean => true;
  static get nodeType(): string {
    return 'doc';
  }
}
