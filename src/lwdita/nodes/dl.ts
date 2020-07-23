import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid, Attributes } from "../utils";
import { makeComponent, BaseNode, makeAll } from "./base";

export const DlFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];
export interface DlNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode {}
export const isValidDlField = (field: string, value: any): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);
export const isDlNode = (value?: any): value is DlNode =>
  typeof value === 'object' && areFieldsValid(DlFields, value, isValidDlField);

export function makeDl<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

@makeComponent(makeDl, 'dl', isValidDlField, DlFields, ['dlentry'])
export class DlNode extends BaseNode {}
