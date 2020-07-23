import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, Attributes } from "../utils";
import { makeComponent, BaseNode, makeAll } from "./base";

export const PreFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields, 'xml:space'];
export interface PreNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode {}
// TODO: 'xml:space' (preserve)
export const isValidPreField = (field: string, value: any): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);
export const isPreNode = (value?: any): value is PreNode =>
  typeof value === 'object' && areFieldsValid(PreFields, value, isValidPreField);

export function makePre<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

@makeComponent(makePre, 'pre', isValidPreField, PreFields, ['text', 'ph', 'xref', 'data'])
export class PreNode extends BaseNode {}