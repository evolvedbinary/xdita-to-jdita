import { ClassAttributes, ClassFields, isValidClassField } from "./class";
import { ReuseAttributes, ReuseFields, isValidReuseField } from "./reuse";
import { LocalizationAttributes, LocalizationFields, isValidLocalizationField } from "./localization";
import { FiltersAttributes, FiltersFields, isValidFiltersField } from "./filters";
import { areFieldsValid } from "../utils";

export const PFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];
export interface PAttributes extends FiltersAttributes, LocalizationAttributes, ReuseAttributes, ClassAttributes {}
export const isValidPField = (field: string, value: any): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);
export const isPAttributes = (value?: any): value is PAttributes =>
  typeof value === 'object' && areFieldsValid(PFields, value, isValidPField);