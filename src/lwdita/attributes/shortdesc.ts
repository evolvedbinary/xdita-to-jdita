import { ClassAttributes, isClassAttributes } from "./class";
import { LocalizationAttributes, isLocalizationAttributes } from "./localization";
import { FiltersAttributes, isFiltersAttributes } from "./filters";

export interface ShortDescAttributes extends FiltersAttributes, LocalizationAttributes, ClassAttributes {}
export const isShortDescAttributes = (value?: any): value is ShortDescAttributes =>
  isClassAttributes(value) &&
  isFiltersAttributes(value) &&
  isLocalizationAttributes(value);