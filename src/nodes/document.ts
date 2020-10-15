import { BaseNode } from "./base";
import { stringToChildTypes } from "../utils";

export class DocumentNode extends BaseNode {
  static nodeName = 'document';
  static childTypes = stringToChildTypes(['topic']);
  static fields = [];
  static isValidField = (): boolean => true;
}
