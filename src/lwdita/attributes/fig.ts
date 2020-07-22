import { DisplayAttributes, isDisplayAttributes } from "./display";
import { LocalizationAttributes, isLocalizationAttributes } from "./localization";
import { VariableContentAttributes, isVariableContentAttributes } from "./variable-content";
import { isClassAttributes, ClassAttributes } from "./class";

export interface FigAttributes extends DisplayAttributes, LocalizationAttributes, VariableContentAttributes, ClassAttributes {}
export const isFigAttributes = (value?: any): value is FigAttributes =>
  isClassAttributes(value) &&
  isVariableContentAttributes(value) &&
  isLocalizationAttributes(value) &&
  isDisplayAttributes(value);
