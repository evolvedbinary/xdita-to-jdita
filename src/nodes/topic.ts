import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ID, CDATA, isCDATA, isOrUndefined, areFieldsValid, BasicValue } from "../utils";
import { BaseNode, makeComponent, makeAll } from "./base";

export const TopicFields = [...LocalizationFields, ...ClassFields, 'id', 'xmlns:ditaarch', 'ditaarch:DITAArchVersion', 'domains'];
export interface TopicNode extends LocalizationNode, ClassNode {
  'id': ID;
  'xmlns:ditaarch': CDATA;
  'ditaarch:DITAArchVersion'?: CDATA;
  // TODO: "&xdita-constraint; &included-domains;"
  'domains'?: CDATA;
}
export function isValidTopicField(field: string, value: BasicValue): boolean {
  if (isValidLocalizationField(field, value) || isValidClassField(field, value)) {
    return true;
  }
  switch(field) {
    case 'id': return isOrUndefined(isCDATA, value);
    case 'xmlns:ditaarch': return isOrUndefined(isCDATA, value);
    case 'domains': return isOrUndefined(isCDATA, value);
    case 'ditaarch:DITAArchVersion': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}
export const isTopicNode = (value?: {}): value is TopicNode =>
  typeof value === 'object' && areFieldsValid(TopicFields, value, isValidTopicField);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeTopic<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(class extends constructor {
    get 'id'(): ID {
      return this.readProp<ID>('id'); }
    set 'id'(value: ID) {
        this.writeProp<ID>('id', value); }
    get 'xmlns:ditaarch'(): CDATA {
      return this.readProp<CDATA>('xmlns:ditaarch'); }
    set 'xmlns:ditaarch'(value: CDATA) {
        this.writeProp<CDATA>('xmlns:ditaarch', value); }
    get 'ditaarch:DITAArchVersion'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('ditaarch:DITAArchVersion'); }
    set 'ditaarch:DITAArchVersion'(value: CDATA | undefined) {
        this.writeProp<CDATA | undefined>('ditaarch:DITAArchVersion', value); }
    get 'domains'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('domains'); }
    set 'domains'(value: CDATA | undefined) {
        this.writeProp<CDATA | undefined>('domains', value); }
  }, makeLocalization, makeClass,);
}

@makeComponent(makeTopic, 'topic', isValidTopicField, TopicFields, ['title', 'shortdesc', 'prolog', 'body'])
export class TopicNode extends BaseNode {
  static domNodeName = 'article';
}
