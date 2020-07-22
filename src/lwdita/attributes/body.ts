import { LocalizationAttributes, isLocalizationAttributes, LocalizationFields } from "./localization";
import { ClassAttributes, isClassAttributes, ClassFields } from "./class";

export const BodyFields = [...LocalizationFields, ...ClassFields];
export interface BodyAttributes extends LocalizationAttributes, ClassAttributes {}
export const isBodyAttributes = (value?: any): value is BodyAttributes =>
  isClassAttributes(value) &&
  isLocalizationAttributes(value);