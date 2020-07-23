import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, Attributes } from "../utils";
import { makeComponent, BaseNode, makeAll } from "./base";

export const SimpleTableFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];
export interface SimpleTableNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode {}
export const isValidSimpleTableField = (field: string, value: any): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);
export const isSimpleTableNode = (value?: any): value is SimpleTableNode =>
  typeof value === 'object' && areFieldsValid(SimpleTableFields, value, isValidSimpleTableField);

export function makeSimpleTable<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

@makeComponent(makeSimpleTable, 'simpletable', isValidSimpleTableField, SimpleTableFields, ['sthead', 'strow'])
export class SimpleTableNode extends BaseNode {
  constructor(attributes?: Attributes) {
      super();
      this._props = this.attributesToProps(attributes);
  }
}
