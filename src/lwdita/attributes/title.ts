import { LocalizationAttributes, isLocalizationAttributes } from "./localization";
import { ClassAttributes, isClassAttributes } from "./class";

export interface TitleAttributes extends LocalizationAttributes, ClassAttributes {}
export const isTitleAttributes = (value?: any): value is TitleAttributes =>
  isClassAttributes(value) && isLocalizationAttributes(value);