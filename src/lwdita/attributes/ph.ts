import { ClassAttributes, ClassFields, isValidClassField } from "./class";
import { VariableContentAttributes, VariableContentFields, isValidVariableContentField } from "./variable-content";
import { LocalizationAttributes, LocalizationFields, isValidLocalizationField } from "./localization";
import { FiltersAttributes, FiltersFields, isValidFiltersField } from "./filters";
import { areFieldsValid } from "../utils";

export const PhFields = [...FiltersFields, ...LocalizationFields, ...VariableContentFields, ...ClassFields];
export interface PhAttributes extends FiltersAttributes, LocalizationAttributes, VariableContentAttributes, ClassAttributes {}
export const isValidPhField = (field: string, value: any): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidVariableContentField(field, value)
  || isValidClassField(field, value);
export const isPhAttributes = (value?: any): value is PhAttributes =>
  typeof value === 'object' && areFieldsValid(PhFields, value, isValidPhField);
