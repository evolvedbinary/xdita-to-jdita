import { FiltersAttributes, isFiltersAttributes } from "./filters";
import { VariableContentAttributes, isVariableContentAttributes } from "./variable-content";
import { LocalizationAttributes, isLocalizationAttributes } from "./localization";
import { ClassAttributes, isClassAttributes } from "./class";

export interface DlEntryAttributes extends FiltersAttributes, LocalizationAttributes, VariableContentAttributes, ClassAttributes {}
export const isDlEntryAttributes = (value?: any): value is DlEntryAttributes =>
  isClassAttributes(value) &&
  isFiltersAttributes(value) &&
  isLocalizationAttributes(value) &&
  isVariableContentAttributes(value);
