import { ClassAttributes, ClassFields, isValidClassField } from "./class";
import { VariableContentAttributes, VariableContentFields, isValidVariableContentField } from "./variable-content";
import { LocalizationAttributes, LocalizationFields, isValidLocalizationField } from "./localization";
import { FiltersAttributes, FiltersFields, isValidFiltersField } from "./filters";
import { areFieldsValid } from "../utils";

export const DtFields = [...FiltersFields, ...LocalizationFields, ...VariableContentFields, ...ClassFields];
export interface DtAttributes extends FiltersAttributes, LocalizationAttributes, VariableContentAttributes, ClassAttributes {}
export const isValidDtField = (field: string, value: any): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidVariableContentField(field, value)
  || isValidClassField(field, value);
export const isDtAttributes = (value?: any): value is DtAttributes =>
  typeof value === 'object' && areFieldsValid(DtFields, value, isValidDtField);
