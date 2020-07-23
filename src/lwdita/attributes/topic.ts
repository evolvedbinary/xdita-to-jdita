import { LocalizationAttributes, LocalizationFields, isValidLocalizationField } from "./localization";
import { ClassAttributes, ClassFields, isValidClassField } from "./class";
import { ID, CDATA, isCDATA, isOrUndefined, areFieldsValid } from "../utils";

export const TopicFields = [...LocalizationFields, ...ClassFields];
export interface TopicAttributes extends LocalizationAttributes, ClassAttributes {
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
export const isTopicAttributes = (value?: any): value is TopicAttributes =>
  typeof value === 'object' && areFieldsValid(TopicFields, value, isValidTopicField);
