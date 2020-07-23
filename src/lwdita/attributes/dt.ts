import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { VariableContentNode, VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, Attributes } from "../utils";
import { BaseNode, makeComponent, makeAll } from "./base";

export const DtFields = [...FiltersFields, ...LocalizationFields, ...VariableContentFields, ...ClassFields];
export interface DtNode extends FiltersNode, LocalizationNode, VariableContentNode, ClassNode {}
export const isValidDtField = (field: string, value: any): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidVariableContentField(field, value)
  || isValidClassField(field, value);
export const isDtNode = (value?: any): value is DtNode =>
  typeof value === 'object' && areFieldsValid(DtFields, value, isValidDtField);

export function makeDt<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeFilters, makeVariableContent, makeClass);
}

@makeComponent(makeDt, 'dt', isValidDtField, DtFields, [], ['all-inline'])
export class DtNode extends BaseNode {
  constructor(attributes?: Attributes) {
      super();
      this._props = this.attributesToProps(attributes);
  }
}
