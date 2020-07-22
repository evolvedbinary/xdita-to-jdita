/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseNode } from "./base";
import { ID, CDATA, isID, isCDATA, isOrUndefined, Attributes } from "../utils";
import { TopicAttributes } from "../attributes/topic";

export class TopicNode extends BaseNode implements TopicAttributes {
  static nodeName = 'topic';
  static childTypes = ['title', 'shortdesc', 'prolog', 'body'];
  elementName = 'topic';
  _props!: TopicAttributes;
  static fields = [
      'dir',
      'xml:lang',
      'translate',
      'id',
      'xmlns:ditaarch',
      'ditaarch:DITAArchVersion',
      'domains',
      'outputClass',
      'className',
  ];
  static isValidField(field: string, value: any): boolean {
      switch(field) {
          case 'dir': return isOrUndefined(isCDATA, value);
          case 'xml:lang': return isOrUndefined(isCDATA, value);
          case 'translate': return isOrUndefined(isCDATA, value);
          case 'id': return isID(value);
          case 'xmlns:ditaarch': return isCDATA(value);
          case 'ditaarch:DITAArchVersion': return isOrUndefined(isCDATA, value);
          case 'domains': return isOrUndefined(isCDATA, value);
          case 'outputClass': return isOrUndefined(isCDATA, value);
          case 'className': return isOrUndefined(isCDATA, value);
          default: return false;
      }
  }
  constructor(attributes: Attributes){
      super();
      this._props = this.attributesToProps(attributes);
  }
  get 'dir'(): CDATA {
      return this.readProp<CDATA>('dir'); }
  get 'xml:lang'(): CDATA {
      return this.readProp<CDATA>('xml:lang'); }
  get 'translate'(): CDATA | undefined {
      return this.readProp<CDATA>('translate'); }
  get 'id'(): ID {
      return this.readProp<ID>('id'); }
  get 'xmlns:ditaarch'(): CDATA {
      return this.readProp<CDATA>('xmlns:ditaarch'); }
  get 'ditaarch:DITAArchVersion'(): CDATA | undefined {
      return this.readProp<CDATA>('ditaarch:DITAArchVersion'); }
  get 'domains'(): CDATA | undefined {
      return this.readProp<CDATA>('domains'); }
  get 'outputClass'(): CDATA | undefined {
      return this.readProp<CDATA>('outputClass'); }
  get 'className'(): CDATA | undefined {
      return this.readProp<CDATA>('className'); }

}
