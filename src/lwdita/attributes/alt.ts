import { LocalizationAttributes, isLocalizationAttributes } from "./localization";
import { FiltersAttributes, isFiltersAttributes } from "./filters";
import { VariableContentAttributes, isVariableContentAttributes } from "./variable-content";
import { ClassAttributes, isClassAttributes } from "./class";

export interface AltAttributes extends LocalizationAttributes, FiltersAttributes, VariableContentAttributes, ClassAttributes {}
export const isAltAttributes = (value?: any): value is AltAttributes =>
  typeof value === 'object' &&
  isClassAttributes(value) &&
  isFiltersAttributes(value) &&
  isLocalizationAttributes(value) &&
  isVariableContentAttributes(value);