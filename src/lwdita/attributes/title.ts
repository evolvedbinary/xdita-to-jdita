import { LocalizationAttributes, isLocalizationAttributes, LocalizationFields } from "./localization";
import { ClassAttributes, isClassAttributes, ClassFields } from "./class";

export const TitleFields = [...LocalizationFields, ...ClassFields];
export interface TitleAttributes extends LocalizationAttributes, ClassAttributes {}
export const isTitleAttributes = (value?: any): value is TitleAttributes =>
  isClassAttributes(value) && isLocalizationAttributes(value);