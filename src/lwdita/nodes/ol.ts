import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, Attributes } from "../utils";
import { makeComponent, BaseNode, makeAll } from "./base";

export const OlFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];
export interface OlNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode {}
export const isValidOlField = (field: string, value: any): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);
export const isOlNode = (value?: any): value is OlNode =>
  typeof value === 'object' && areFieldsValid(OlFields, value, isValidOlField);

export function makeOl<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

@makeComponent(makeOl, 'ol', isValidOlField, OlFields, ['li'])
export class OlNode extends BaseNode {}
