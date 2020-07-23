import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, Attributes, CDATA, isOrUndefined, isCDATA } from "../utils";
import { makeComponent, BaseNode, makeAll } from "./base";

export const PrologFields = [...FiltersFields, ...LocalizationFields, 'class'];
export interface PrologNode extends FiltersNode, LocalizationNode {
  'class'?: CDATA;
}
export function isValidPrologField(field: string, value: any): boolean {
  if (isValidFiltersField(field, value) || isValidLocalizationField(field, value)) {
    return true;
  }
  switch(field) {
    case 'class': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}
export const isPrologNode = (value?: any): value is PrologNode =>
  typeof value === 'object' && areFieldsValid(PrologFields, value, isValidPrologField);

export function makeProlog<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(class extends constructor {
    get 'class'(): CDATA {
      return this.readProp<CDATA>('class'); }
    set 'class'(value: CDATA) {
        this.writeProp<CDATA>('class', value); }
  }, makeLocalization, makeFilters);
}

@makeComponent(makeProlog, 'prolog', isValidPrologField, PrologFields, ['li'])
export class PrologNode extends BaseNode {
  constructor(attributes?: Attributes) {
      super();
      this._props = this.attributesToProps(attributes);
  }
}
