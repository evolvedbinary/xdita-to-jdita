import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, Attributes } from "../utils";
import { makeComponent, BaseNode, makeAll } from "./base";

export const StRowFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];
export interface StRowNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode {}
export const isValidStRowField = (field: string, value: any): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);
export const isStRowNode = (value?: any): value is StRowNode =>
  typeof value === 'object' && areFieldsValid(StRowFields, value, isValidStRowField);

export function makeStRow<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

@makeComponent(makeStRow, 'strow', isValidStRowField, StRowFields, ['stentry'])
export class StRowNode extends BaseNode {}
