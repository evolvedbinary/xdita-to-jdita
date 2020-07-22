import { FiltersAttributes, isFiltersAttributes, FiltersFields } from "./filters";
import { ClassAttributes, isClassAttributes, ClassFields } from "./class";
import { ReuseAttributes, isReuseAttributes, ReuseFields } from "./reuse";
import { LocalizationAttributes, isLocalizationAttributes, LocalizationFields } from "./localization";

export const DlFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];
export interface DlAttributes extends FiltersAttributes, LocalizationAttributes, ReuseAttributes, ClassAttributes {}
export const isDlAttributes = (value?: any): value is DlAttributes =>
  isFiltersAttributes(value) &&
  isClassAttributes(value) &&
  isLocalizationAttributes(value) &&
  isReuseAttributes(value);