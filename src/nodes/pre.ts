import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, BasicValue, isOrUndefined, isCDATA, CDATA } from "../utils";
import { makeComponent, BaseNode, makeAll } from "./base";

export const PreFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields, 'xml:space'];

export interface PreNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

// TODO: 'xml:space' (preserve)
export const isValidPreField = (field: string, value: BasicValue): boolean => {
  if (isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value)) {
    return true;
  }
  switch (field) {
    case 'xml:space': return isOrUndefined(isCDATA, value);
    default: return false;
  }
};

export const isPreNode = (value?: {}): value is PreNode =>
  typeof value === 'object' && areFieldsValid(PreFields, value, isValidPreField);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makePre<T extends { new(...args: any[]): BaseNode }>(constructor: T): T {
  return makeAll(class extends constructor {
    get 'xmlns:space'(): CDATA {
      return this.readProp<CDATA>('xmlns:space'); }
    set 'xmlns:space'(value: CDATA) {
        this.writeProp<CDATA>('xmlns:space', value); }
  }, makeLocalization, makeFilters, makeReuse, makeClass);
}

// TODO: "or" instead of "order"
@makeComponent(makePre, 'pre', isValidPreField, PreFields, ['text*', '%ph*', 'xref*', '%data*'])
export class PreNode extends BaseNode {
  static domNodeName = 'pre';
}
