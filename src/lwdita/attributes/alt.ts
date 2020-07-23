import { LocalizationAttributes, LocalizationFields, isValidLocalizationField } from "./localization";
import { FiltersAttributes, FiltersFields, isValidFiltersField } from "./filters";
import { VariableContentAttributes, VariableContentFields, isValidVariableContentField } from "./variable-content";
import { ClassAttributes, ClassFields, isValidClassField } from "./class";
import { areFieldsValid } from "../utils";

export const AltFields = [...LocalizationFields, ...FiltersFields, ...VariableContentFields, ...ClassFields];
export interface AltAttributes extends LocalizationAttributes, FiltersAttributes, VariableContentAttributes, ClassAttributes {}
export const isValidAltField = (field: string, value: any): boolean => isValidLocalizationField(field, value)
  || isValidFiltersField(field, value)
  || isValidVariableContentField(field, value)
  || isValidClassField(field, value);
export const isAltAttributes = (value?: any): value is AltAttributes =>
  typeof value === 'object' && areFieldsValid(AltFields, value, isValidAltField);
