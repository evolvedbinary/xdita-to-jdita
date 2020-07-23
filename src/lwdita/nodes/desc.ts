import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, Attributes } from "../utils";
import { BaseNode, makeComponent, makeAll } from "./base";

export const DescFields = [...FiltersFields, ...LocalizationFields, ...ClassFields];
export interface DescNode extends FiltersNode, LocalizationNode, ClassNode {}
export const isValidDescField = (field: string, value: any): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);
export const isDescNode = (value?: any): value is DescNode =>
  typeof value === 'object' && areFieldsValid(DescFields, value, isValidDescField);

export function makeDesc<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeFilters, makeClass);
}

@makeComponent(makeDesc, 'desc', isValidDescField, DescFields, [], ['common-inline'])
export class DescNode extends BaseNode {
  constructor(attributes?: Attributes) {
      super();
      this._props = this.attributesToProps(attributes);
  }
}
