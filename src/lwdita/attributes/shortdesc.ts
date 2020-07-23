import { ClassAttributes, ClassFields, isValidClassField } from "./class";
import { LocalizationAttributes, LocalizationFields, isValidLocalizationField } from "./localization";
import { FiltersAttributes, FiltersFields, isValidFiltersField } from "./filters";
import { areFieldsValid } from "../utils";

export const ShortDescFields = [...FiltersFields, ...LocalizationFields, ...ClassFields];
export interface ShortDescAttributes extends FiltersAttributes, LocalizationAttributes, ClassAttributes {}
export const isValidShortDescField = (field: string, value: any): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);
export const isShortDescAttributes = (value?: any): value is ShortDescAttributes =>
  typeof value === 'object' && areFieldsValid(ShortDescFields, value, isValidShortDescField);