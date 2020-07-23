import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, Attributes } from "../utils";
import { makeComponent, BaseNode, makeAll } from "./base";

export const PFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];
export interface PNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode {}
export const isValidPField = (field: string, value: any): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);
export const isPNode = (value?: any): value is PNode =>
  typeof value === 'object' && areFieldsValid(PFields, value, isValidPField);

export function makeP<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

@makeComponent(makeP, 'p', isValidPField, PFields, [], ['all-inline'])
export class PNode extends BaseNode {}
