import { LocalizationAttributes, isLocalizationAttributes, LocalizationFields } from "./localization";
import { ClassAttributes, isClassAttributes, ClassFields } from "./class";
import { ID, CDATA, isID, isCDATA, isOrUndefined } from "../utils";

export const TopicFields = [...LocalizationFields, ...ClassFields];
export interface TopicAttributes extends LocalizationAttributes, ClassAttributes {
  'id': ID;
  'xmlns:ditaarch': CDATA;
  'ditaarch:DITAArchVersion'?: CDATA;
  // TODO: "&xdita-constraint; &included-domains;"
  'domains'?: CDATA;
}
export const isTopicAttributes = (value?: any): value is TopicAttributes =>
  value &&
  isID(value['id']) &&
  isCDATA(value['xmlns:ditaarch']) &&
  isOrUndefined(isCDATA, value['ditaarch:DITAArchVersion']) &&
  isOrUndefined(isCDATA, value['domains']) &&
  isClassAttributes(value) &&
  isLocalizationAttributes(value);