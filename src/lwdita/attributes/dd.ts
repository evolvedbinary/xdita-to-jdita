import { FiltersAttributes, isFiltersAttributes } from "./filters";
import { LocalizationAttributes, isLocalizationAttributes } from "./localization";
import { VariableContentAttributes, isVariableContentAttributes } from "./variable-content";
import { ClassAttributes, isClassAttributes } from "./class";

export interface DdAttributes extends FiltersAttributes, LocalizationAttributes, VariableContentAttributes, ClassAttributes {}
export const isDdAttributes = (value?: any): value is DdAttributes =>
  isClassAttributes(value) &&
  isFiltersAttributes(value) &&
  isLocalizationAttributes(value) &&
  isVariableContentAttributes(value);