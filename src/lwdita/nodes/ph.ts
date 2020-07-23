import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { VariableContentNode, VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, Attributes } from "../utils";
import { BaseNode, makeComponent, makeAll } from "./base";

export const PhFields = [...FiltersFields, ...LocalizationFields, ...VariableContentFields, ...ClassFields];
export interface PhNode extends FiltersNode, LocalizationNode, VariableContentNode, ClassNode {}
export const isValidPhField = (field: string, value: any): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidVariableContentField(field, value)
  || isValidClassField(field, value);
export const isPhNode = (value?: any): value is PhNode =>
  typeof value === 'object' && areFieldsValid(PhFields, value, isValidPhField);

export function makePh<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeFilters, makeVariableContent, makeClass);
}

@makeComponent(makePh, 'ph', isValidPhField, PhFields, [], ['all-inline'])
export class PhNode extends BaseNode {}
