import { ClassAttributes, isClassAttributes } from "./class";
import { VariableContentAttributes, isVariableContentAttributes } from "./variable-content";
import { LocalizationAttributes, isLocalizationAttributes } from "./localization";
import { FiltersAttributes, isFiltersAttributes } from "./filters";

export interface PhAttributes extends FiltersAttributes, LocalizationAttributes, VariableContentAttributes, ClassAttributes {}
export const isPhAttributes = (value?: any): value is PhAttributes =>
  isClassAttributes(value) &&
  isFiltersAttributes(value) &&
  isLocalizationAttributes(value) &&
  isVariableContentAttributes(value);
