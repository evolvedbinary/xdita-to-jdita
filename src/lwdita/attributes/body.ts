import { LocalizationAttributes, LocalizationFields, isValidLocalizationField } from "./localization";
import { ClassAttributes, ClassFields, isValidClassField } from "./class";
import { areFieldsValid } from "../utils";

export const BodyFields = [...LocalizationFields, ...ClassFields];
export interface BodyAttributes extends LocalizationAttributes, ClassAttributes {}
export const isValidBodyField = (field: string, value: any): boolean => isValidLocalizationField(field, value)
  || isValidClassField(field, value);
export const isBodyAttributes = (value?: any): value is BodyAttributes =>
  typeof value === 'object' && areFieldsValid(BodyFields, value, isValidBodyField);