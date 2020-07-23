import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ID, CDATA, isCDATA, isOrUndefined, areFieldsValid, Attributes } from "../utils";
import { BaseNode, makeComponent, makeAll } from "./base";

export const TopicFields = [...LocalizationFields, ...ClassFields];
export interface TopicNode extends LocalizationNode, ClassNode {
  'id': ID;
  'xmlns:ditaarch': CDATA;
  'ditaarch:DITAArchVersion'?: CDATA;
  // TODO: "&xdita-constraint; &included-domains;"
  'domains'?: CDATA;
}
export function isValidTopicField(field: string, value: any): boolean {
  if (isValidLocalizationField(field, value) || isValidClassField(field, value)) {
    return true;
  }
  switch(field) {
    case 'dir': return isOrUndefined(isCDATA, value);
    case 'xml:lang': return isOrUndefined(isCDATA, value);
    case 'translate': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}
export const isTopicNode = (value?: any): value is TopicNode =>
  typeof value === 'object' && areFieldsValid(TopicFields, value, isValidTopicField);

export function makeTopic<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeClass,);
}

@makeComponent(makeTopic, 'topic', isValidTopicField, TopicFields, ['title', 'shortdesc', 'prolog', 'body'])
export class TopicNode extends BaseNode {
  constructor(attributes?: Attributes) {
    super();
    this._props = this.attributesToProps(attributes);
  }
}
