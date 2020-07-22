import { ClassAttributes, isClassAttributes, ClassFields } from "./class";
import { LocalizationAttributes, isLocalizationAttributes, LocalizationFields } from "./localization";
import { FiltersAttributes, isFiltersAttributes, FiltersFields } from "./filters";

export const ShortDescFields = [...FiltersFields, ...LocalizationFields, ...ClassFields];
export interface ShortDescAttributes extends FiltersAttributes, LocalizationAttributes, ClassAttributes {}
export const isShortDescAttributes = (value?: any): value is ShortDescAttributes =>
  isClassAttributes(value) &&
  isFiltersAttributes(value) &&
  isLocalizationAttributes(value);