import { DisplayAttributes, DisplayFields, isValidDisplayField } from "./display";
import { LocalizationAttributes, LocalizationFields, isValidLocalizationField } from "./localization";
import { VariableContentAttributes, VariableContentFields, isValidVariableContentField } from "./variable-content";
import { ClassAttributes, ClassFields, isValidClassField } from "./class";
import { areFieldsValid } from "../utils";

export const FigFields = [...DisplayFields, ...LocalizationFields, ...VariableContentFields, ...ClassFields];
export interface FigAttributes extends DisplayAttributes, LocalizationAttributes, VariableContentAttributes, ClassAttributes {}
export const isValidFigField = (field: string, value: any): boolean => isValidDisplayField(field, value)
  || isValidLocalizationField(field, value)
  || isValidVariableContentField(field, value)
  || isValidClassField(field, value);
export const isFigAttributes = (value?: any): value is FigAttributes =>
  typeof value === 'object' && areFieldsValid(FigFields, value, isValidFigField);
