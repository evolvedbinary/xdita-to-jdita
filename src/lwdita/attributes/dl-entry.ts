import { FiltersAttributes, isFiltersAttributes, FiltersFields } from "./filters";
import { VariableContentAttributes, isVariableContentAttributes, VariableContentFields } from "./variable-content";
import { LocalizationAttributes, isLocalizationAttributes, LocalizationFields } from "./localization";
import { ClassAttributes, isClassAttributes, ClassFields } from "./class";

export const DlEntryFields = [...FiltersFields, ...LocalizationFields, ...VariableContentFields, ...ClassFields];
export interface DlEntryAttributes extends FiltersAttributes, LocalizationAttributes, VariableContentAttributes, ClassAttributes {}
export const isDlEntryAttributes = (value?: any): value is DlEntryAttributes =>
  isClassAttributes(value) &&
  isFiltersAttributes(value) &&
  isLocalizationAttributes(value) &&
  isVariableContentAttributes(value);
