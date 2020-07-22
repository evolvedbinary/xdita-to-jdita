/* eslint-disable @typescript-eslint/no-explicit-any */

import { has, nodeGroups, Attributes } from "../utils";

export abstract class BaseNode {
  static nodeName = 'node';
  static fields: Array<string>;
  static childTypes: Array<string> = [];
  static childGroups: Array<string> = [];
  protected _children?: BaseNode[];
  protected _props!: Record<string, any>;
  protected get static(): typeof BaseNode {
      return this.constructor as any;
  }
  get json(): Record<string, any> {
      return {
          nodeName: this.static.nodeName,
          ...this._props,
          children: this._children?.map(child => child.json),
      };
  }
  static canAdd(child: BaseNode): boolean {
      return (this.childTypes.length > 0 && has(this.childTypes, child.static.nodeName)) ||
          (this.childGroups.length > 0 && !!this.childGroups.find(group => has(nodeGroups[group], child.static.nodeName)));
  }
  add(child: BaseNode, breakOnError = true): void {
      if (!this._children) {
          this._children = [];
      }
      if (!this.static.canAdd(child)) {
          if (breakOnError) {
              throw new Error(`"${child.static.nodeName}" node can't be a child of "${this.static.nodeName}" node`);
          }
          return;
      }
      this._children.push(child)
  }
  isNode(name: string): boolean {
      return name === this.static.nodeName;
  }
  protected attributesToProps<T = Record<string, any>>(attributes: Attributes = {}): T {
      const result: Record<string, any> = {};
      this.static.fields.forEach(field => {
          const attr = attributes[field];
          result[field] = typeof attr === 'string' ? attr : attr?.value;
      });
      return result as T;
  }
  readProp<T = any>(field: string): T {
      if (this.static.fields.indexOf(field) < 0) {
          throw new Error('unkown property "' + field + '"');
      }
      return this._props[field];
  }
  writeProp<T = any>(field: string, value: T): void {
      if (this.static.fields.indexOf(field) < 0) {
          throw new Error('unkown property "' + field + '"');
      }
      if (!this.static.isValidField(field, value)) {
          throw new Error('wrong property  type "' + typeof(value) + '" for field"' + field + '"');
      }
      this._props[field] = value;
  }
  static isValidField(field: string, value: any): boolean {
      return true;
  }
}
