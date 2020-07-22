import { FiltersAttributes, isFiltersAttributes } from "./filters";
import { ClassAttributes, isClassAttributes } from "./class";
import { ReuseAttributes, isReuseAttributes } from "../reuse";
import { LocalizationAttributes, isLocalizationAttributes } from "./localization";

export interface DlAttributes extends FiltersAttributes, LocalizationAttributes, ReuseAttributes, ClassAttributes {}
export const isDlAttributes = (value?: any): value is DlAttributes =>
  isFiltersAttributes(value) &&
  isClassAttributes(value) &&
  isLocalizationAttributes(value) &&
  isReuseAttributes(value);