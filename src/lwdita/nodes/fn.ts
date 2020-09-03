import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { FnReuseNode, FnReuseFields, isValidFnReuseField, makeFnReuse } from "./fn-reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, BasicValue } from "../utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";

export const FnFields = [...FiltersFields, ...LocalizationFields, ...FnReuseFields, ...ClassFields, 'xml:space'];

// TODO: 'xml:space' (preserve)
export interface FnNode extends FiltersNode, LocalizationNode, FnReuseNode, ClassNode { }

export const isValidFnField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidFnReuseField(field, value)
  || isValidClassField(field, value);

export const isFnNode = (value?: {}): value is FnNode =>
  typeof value === 'object' && areFieldsValid(FnFields, value, isValidFnField);

export function makeFn<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeFnReuse, makeClass);
}

@makeComponent(makeFn, 'fn', isValidFnField, FnFields, ['text', 'ph', 'xref', 'data'])
export class FnNode extends BaseNode {
  // TODO: span[data-class=fn]
  static domNodeName = '';
}
