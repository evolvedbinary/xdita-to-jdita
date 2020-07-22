import { ClassAttributes, isClassAttributes, ClassFields } from "./class";
import { VariableContentAttributes, isVariableContentAttributes, VariableContentFields } from "./variable-content";
import { LocalizationAttributes, isLocalizationAttributes, LocalizationFields } from "./localization";
import { FiltersAttributes, isFiltersAttributes, FiltersFields } from "./filters";

export const DtFields = [...FiltersFields, ...LocalizationFields, ...VariableContentFields, ...ClassFields];
export interface DtAttributes extends FiltersAttributes, LocalizationAttributes, VariableContentAttributes, ClassAttributes {}
export const isDtAttributes = (value?: any): value is DtAttributes =>
  isClassAttributes(value) &&
  isFiltersAttributes(value) &&
  isLocalizationAttributes(value) &&
  isVariableContentAttributes(value);
