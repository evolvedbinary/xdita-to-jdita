import { ClassAttributes, isClassAttributes, ClassFields } from "./class";
import { VariableContentAttributes, isVariableContentAttributes, VariableContentFields } from "./variable-content";
import { LocalizationAttributes, isLocalizationAttributes, LocalizationFields } from "./localization";
import { FiltersAttributes, isFiltersAttributes, FiltersFields } from "./filters";

export const PhFields = [...FiltersFields, ...LocalizationFields, ...VariableContentFields, ...ClassFields];
export interface PhAttributes extends FiltersAttributes, LocalizationAttributes, VariableContentAttributes, ClassAttributes {}
export const isPhAttributes = (value?: any): value is PhAttributes =>
  isClassAttributes(value) &&
  isFiltersAttributes(value) &&
  isLocalizationAttributes(value) &&
  isVariableContentAttributes(value);
