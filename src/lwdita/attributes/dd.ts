import { FiltersAttributes, FiltersFields, isValidFiltersField } from "./filters";
import { LocalizationAttributes, LocalizationFields, isValidLocalizationField } from "./localization";
import { VariableContentAttributes, VariableContentFields, isValidVariableContentField } from "./variable-content";
import { ClassAttributes, ClassFields, isValidClassField } from "./class";
import { areFieldsValid } from "../utils";

export const DdFields = [...FiltersFields, ...LocalizationFields, ...VariableContentFields, ...ClassFields];
export interface DdAttributes extends FiltersAttributes, LocalizationAttributes, VariableContentAttributes, ClassAttributes {}
export const isValidDdField = (field: string, value: any): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidVariableContentField(field, value)
  || isValidClassField(field, value);
export const isDdAttributes = (value?: any): value is DdAttributes =>
  typeof value === 'object' && areFieldsValid(DdFields, value, isValidDdField);