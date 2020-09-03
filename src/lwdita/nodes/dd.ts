import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { VariableContentNode, VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid, BasicValue } from "../utils";
import { BaseNode, makeComponent, makeAll, Constructor } from "./base";

export const DdFields = [...FiltersFields, ...LocalizationFields, ...VariableContentFields, ...ClassFields];

export interface DdNode extends FiltersNode, LocalizationNode, VariableContentNode, ClassNode { }

export const isValidDdField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidVariableContentField(field, value)
  || isValidClassField(field, value);

export const isDdNode = (value?: {}): value is DdNode =>
  typeof value === 'object' && areFieldsValid(DdFields, value, isValidDdField);

export function makeDd<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeVariableContent, makeClass);
}

@makeComponent(makeDd, 'dd', isValidDdField, DdFields, [], ['all-inline'])
export class DdNode extends BaseNode {
  static domNodeName = 'dd';
}
