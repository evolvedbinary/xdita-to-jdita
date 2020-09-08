import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { FnReuseNode, FnReuseFields, isValidFnReuseField, makeFnReuse } from "./fn-reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, BasicValue, isOrUndefined, isCDATA, CDATA, ID } from "../utils";
import { makeComponent, BaseNode, makeAll } from "./base";

export const FnFields = [...FiltersFields, ...LocalizationFields, ...FnReuseFields, ...ClassFields, 'id', 'callout'];

// TODO: 'xml:space' (preserve)
export interface FnNode extends FiltersNode, LocalizationNode, FnReuseNode, ClassNode { }

export const isValidFnField = (field: string, value: BasicValue): boolean => {
  if (isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidFnReuseField(field, value)
  || isValidClassField(field, value)) {
    return true;
  }
  switch (field) {
    case 'id': return isOrUndefined(isCDATA, value);
    case 'callout': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

export const isFnNode = (value?: {}): value is FnNode =>
  typeof value === 'object' && areFieldsValid(FnFields, value, isValidFnField);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeFn<T extends { new(...args: any[]): BaseNode }>(constructor: T): T {
  return makeAll(class extends constructor {
    get 'id'(): ID {
      return this.readProp<ID>('id'); }
    set 'id'(value: ID) {
        this.writeProp<ID>('id', value); }
    get 'callout'(): CDATA {
      return this.readProp<CDATA>('callout'); }
    set 'callout'(value: CDATA) {
        this.writeProp<CDATA>('callout', value); }
  }, makeLocalization, makeFilters, makeFnReuse, makeClass);
}

@makeComponent(makeFn, 'fn', isValidFnField, FnFields, ['%fn-blocks*'])
export class FnNode extends BaseNode {
  static domNodeName = 'span';
}
