import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, Attributes } from "../utils";
import { makeComponent, BaseNode, makeAll } from "./base";

export const StEntryFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];
export interface StEntryNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode {}
export const isValidStEntryField = (field: string, value: any): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);
export const isStEntryNode = (value?: any): value is StEntryNode =>
  typeof value === 'object' && areFieldsValid(StEntryFields, value, isValidStEntryField);

export function makeStEntry<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

@makeComponent(makeStEntry, 'stentry', isValidStEntryField, StEntryFields, [], ['simple-blocks'])
export class StEntryNode extends BaseNode {
  constructor(attributes?: Attributes) {
      super();
      this._props = this.attributesToProps(attributes);
  }
}
