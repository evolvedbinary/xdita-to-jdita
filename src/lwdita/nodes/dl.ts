import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid, BasicValue } from "../utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";

export const DlFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];
export interface DlNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode {}
export const isValidDlField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);
export const isDlNode = (value?: {}): value is DlNode =>
  typeof value === 'object' && areFieldsValid(DlFields, value, isValidDlField);

export function makeDl<T extends Constructor>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

@makeComponent(makeDl, 'dl', isValidDlField, DlFields, ['dlentry'])
export class DlNode extends BaseNode {}
