import { LocalizationAttributes, isLocalizationAttributes } from "./localization";
import { ClassAttributes, isClassAttributes } from "./class";

export interface BodyAttributes extends LocalizationAttributes, ClassAttributes {}
export const isBodyAttributes = (value?: any): value is BodyAttributes =>
  isClassAttributes(value) &&
  isLocalizationAttributes(value);