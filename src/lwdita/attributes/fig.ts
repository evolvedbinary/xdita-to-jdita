import { DisplayAttributes, isDisplayAttributes, DisplayFields } from "./display";
import { LocalizationAttributes, isLocalizationAttributes, LocalizationFields } from "./localization";
import { VariableContentAttributes, isVariableContentAttributes, VariableContentFields } from "./variable-content";
import { isClassAttributes, ClassAttributes, ClassFields } from "./class";

export const FigFields = [...DisplayFields, ...LocalizationFields, ...VariableContentFields, ...ClassFields];
export interface FigAttributes extends DisplayAttributes, LocalizationAttributes, VariableContentAttributes, ClassAttributes {}
export const isFigAttributes = (value?: any): value is FigAttributes =>
  isClassAttributes(value) &&
  isVariableContentAttributes(value) &&
  isLocalizationAttributes(value) &&
  isDisplayAttributes(value);
