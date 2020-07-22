import { ClassAttributes, isClassAttributes } from "./class";
import { ReuseAttributes, isReuseAttributes } from "../reuse";
import { LocalizationAttributes, isLocalizationAttributes } from "./localization";
import { FiltersAttributes, isFiltersAttributes } from "./filters";

export interface PAttributes extends FiltersAttributes, LocalizationAttributes, ReuseAttributes, ClassAttributes {}
export const isPAttributes = (value?: any): value is PAttributes =>
  isClassAttributes(value) &&
  isFiltersAttributes(value) &&
  isLocalizationAttributes(value) &&
  isReuseAttributes(value);