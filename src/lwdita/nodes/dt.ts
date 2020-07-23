import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { VariableContentNode, VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, BasicValue } from "../utils";
import { BaseNode, makeComponent, makeAll, Constructor } from "./base";

export const DtFields = [...FiltersFields, ...LocalizationFields, ...VariableContentFields, ...ClassFields];
export interface DtNode extends FiltersNode, LocalizationNode, VariableContentNode, ClassNode {}
export const isValidDtField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidVariableContentField(field, value)
  || isValidClassField(field, value);
export const isDtNode = (value?: {}): value is DtNode =>
  typeof value === 'object' && areFieldsValid(DtFields, value, isValidDtField);

export function makeDt<T extends Constructor>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeFilters, makeVariableContent, makeClass);
}

@makeComponent(makeDt, 'dt', isValidDtField, DtFields, [], ['all-inline'])
export class DtNode extends BaseNode {}
