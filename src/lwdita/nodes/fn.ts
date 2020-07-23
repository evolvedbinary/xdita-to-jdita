import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { FnReuseNode, FnReuseFields, isValidFnReuseField, makeFnReuse } from "./fn-reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, Attributes } from "../utils";
import { makeComponent, BaseNode, makeAll } from "./base";

export const FnFields = [...FiltersFields, ...LocalizationFields, ...FnReuseFields, ...ClassFields, 'xml:space'];
export interface FnNode extends FiltersNode, LocalizationNode, FnReuseNode, ClassNode {}
// TODO: 'xml:space' (preserve)
export const isValidFnField = (field: string, value: any): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidFnReuseField(field, value)
  || isValidClassField(field, value);
export const isFnNode = (value?: any): value is FnNode =>
  typeof value === 'object' && areFieldsValid(FnFields, value, isValidFnField);

export function makeFn<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeFilters, makeFnReuse, makeClass);
}

@makeComponent(makeFn, 'fn', isValidFnField, FnFields, ['text', 'ph', 'xref', 'data'])
export class FnNode extends BaseNode {}
