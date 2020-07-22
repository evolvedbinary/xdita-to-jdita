import { ClassAttributes, isClassAttributes, ClassFields } from "./class";
import { ReuseAttributes, isReuseAttributes, ReuseFields } from "./reuse";
import { LocalizationAttributes, isLocalizationAttributes, LocalizationFields } from "./localization";
import { FiltersAttributes, isFiltersAttributes, FiltersFields } from "./filters";

export const PFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];
export interface PAttributes extends FiltersAttributes, LocalizationAttributes, ReuseAttributes, ClassAttributes {}
export const isPAttributes = (value?: any): value is PAttributes =>
  isClassAttributes(value) &&
  isFiltersAttributes(value) &&
  isLocalizationAttributes(value) &&
  isReuseAttributes(value);