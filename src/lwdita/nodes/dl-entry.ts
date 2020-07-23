import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { VariableContentNode, VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid, Attributes } from "../utils";
import { BaseNode, makeComponent, makeAll } from "./base";

export const DlEntryFields = [...FiltersFields, ...LocalizationFields, ...VariableContentFields, ...ClassFields];
export interface DlEntryNode extends FiltersNode, LocalizationNode, VariableContentNode, ClassNode {}
export const isValidDlEntryField = (field: string, value: any): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidVariableContentField(field, value)
  || isValidClassField(field, value);
export const isDlEntryNode = (value?: any): value is DlEntryNode =>
  typeof value === 'object' && areFieldsValid(DlEntryFields, value, isValidDlEntryField);

export function makeDlEntry<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeFilters, makeVariableContent, makeClass);
}

@makeComponent(makeDlEntry, 'dlentry', isValidDlEntryField, DlEntryFields, ['dt', 'dd'])
export class DlEntryNode extends BaseNode {
  constructor(attributes?: Attributes) {
      super();
      this._props = this.attributesToProps(attributes);
  }
}
