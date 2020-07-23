import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, Attributes } from "../utils";
import { makeComponent, BaseNode, makeAll } from "./base";

export const UlFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];
export interface UlNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode {}
export const isValidUlField = (field: string, value: any): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);
export const isUlNode = (value?: any): value is UlNode =>
  typeof value === 'object' && areFieldsValid(UlFields, value, isValidUlField);

export function makeUl<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

@makeComponent(makeUl, 'ul', isValidUlField, UlFields, ['li'])
export class UlNode extends BaseNode {}
