import { FiltersAttributes, FiltersFields, isValidFiltersField } from "./filters";
import { VariableContentAttributes, VariableContentFields, isValidVariableContentField } from "./variable-content";
import { LocalizationAttributes, LocalizationFields, isValidLocalizationField } from "./localization";
import { ClassAttributes, ClassFields, isValidClassField } from "./class";
import { areFieldsValid } from "../utils";

export const DlEntryFields = [...FiltersFields, ...LocalizationFields, ...VariableContentFields, ...ClassFields];
export interface DlEntryAttributes extends FiltersAttributes, LocalizationAttributes, VariableContentAttributes, ClassAttributes {}
export const isValidDlEntryField = (field: string, value: any): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidVariableContentField(field, value)
  || isValidClassField(field, value);
export const isDlEntryAttributes = (value?: any): value is DlEntryAttributes =>
  typeof value === 'object' && areFieldsValid(DlEntryFields, value, isValidDlEntryField);
