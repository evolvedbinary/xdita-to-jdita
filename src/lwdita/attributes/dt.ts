import { ClassAttributes, isClassAttributes } from "./class";
import { VariableContentAttributes, isVariableContentAttributes } from "./variable-content";
import { LocalizationAttributes, isLocalizationAttributes } from "./localization";
import { FiltersAttributes, isFiltersAttributes } from "./filters";

export interface DtAttributes extends FiltersAttributes, LocalizationAttributes, VariableContentAttributes, ClassAttributes {}
export const isDtAttributes = (value?: any): value is DtAttributes =>
  isClassAttributes(value) &&
  isFiltersAttributes(value) &&
  isLocalizationAttributes(value) &&
  isVariableContentAttributes(value);
