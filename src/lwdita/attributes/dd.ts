import { FiltersAttributes, isFiltersAttributes, FiltersFields } from "./filters";
import { LocalizationAttributes, isLocalizationAttributes, LocalizationFields } from "./localization";
import { VariableContentAttributes, isVariableContentAttributes, VariableContentFields } from "./variable-content";
import { ClassAttributes, isClassAttributes, ClassFields } from "./class";

export const DdFields = [...FiltersFields, ...LocalizationFields, ...VariableContentFields, ...ClassFields];
export interface DdAttributes extends FiltersAttributes, LocalizationAttributes, VariableContentAttributes, ClassAttributes {}
export const isDdAttributes = (value?: any): value is DdAttributes =>
  isClassAttributes(value) &&
  isFiltersAttributes(value) &&
  isLocalizationAttributes(value) &&
  isVariableContentAttributes(value);