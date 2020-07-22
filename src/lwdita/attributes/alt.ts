import { LocalizationAttributes, isLocalizationAttributes, LocalizationFields } from "./localization";
import { FiltersAttributes, isFiltersAttributes, FiltersFields } from "./filters";
import { VariableContentAttributes, isVariableContentAttributes, VariableContentFields } from "./variable-content";
import { ClassAttributes, isClassAttributes, ClassFields } from "./class";

export const AltFields = [...LocalizationFields, ...FiltersFields, ...VariableContentFields, ...ClassFields];
export interface AltAttributes extends LocalizationAttributes, FiltersAttributes, VariableContentAttributes, ClassAttributes {}
export const isAltAttributes = (value?: any): value is AltAttributes =>
  typeof value === 'object' &&
  isClassAttributes(value) &&
  isFiltersAttributes(value) &&
  isLocalizationAttributes(value) &&
  isVariableContentAttributes(value);