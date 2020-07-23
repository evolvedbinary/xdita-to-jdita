import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { VariableContentNode, VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid, Attributes } from "../utils";
import { BaseNode, makeComponent, makeAll } from "./base";

export const AltFields = [...LocalizationFields, ...FiltersFields, ...VariableContentFields, ...ClassFields];
export interface AltNode extends LocalizationNode, FiltersNode, VariableContentNode, ClassNode {}
export const isValidAltField = (field: string, value: any): boolean => isValidLocalizationField(field, value)
  || isValidFiltersField(field, value)
  || isValidVariableContentField(field, value)
  || isValidClassField(field, value);
export const isAltNode = (value?: any): value is AltNode =>
  typeof value === 'object' && areFieldsValid(AltFields, value, isValidAltField);

export function makeAlt<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeFilters, makeVariableContent, makeClass);
}

@makeComponent(makeAlt, 'alt', isValidAltField, AltFields, [], ['all-inline'])
export class AltNode extends BaseNode {}
