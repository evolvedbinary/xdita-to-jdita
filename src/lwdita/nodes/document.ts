/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseNode } from "./base";
import { TopicNode } from "./topic";

export class DocumentNode extends BaseNode {
  static nodeName = 'document';
  static childTypes = ['topic'];
  topic?: TopicNode;
  static fields = [];
  static isValidField = (): boolean => true;
  constructor() {
      super();
  }
}
