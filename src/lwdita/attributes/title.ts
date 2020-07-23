import { LocalizationAttributes, LocalizationFields, isValidLocalizationField } from "./localization";
import { ClassAttributes, ClassFields, isValidClassField } from "./class";
import { areFieldsValid } from "../utils";

export const TitleFields = [...LocalizationFields, ...ClassFields];
export interface TitleAttributes extends LocalizationAttributes, ClassAttributes {}
export const isValidTitleField = (field: string, value: any): boolean => isValidLocalizationField(field, value)
  || isValidClassField(field, value);
export const isTitleAttributes = (value?: any): value is TitleAttributes =>
  typeof value === 'object' && areFieldsValid(TitleFields, value, isValidTitleField);