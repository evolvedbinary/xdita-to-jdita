import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, BasicValue } from "../utils";
import { BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { ReuseFields, ReuseNode, isValidReuseField, makeReuse } from "./reuse";

export const DtFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

export interface DtNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

export const isValidDtField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

export const isDtNode = (value?: {}): value is DtNode =>
  typeof value === 'object' && areFieldsValid(DtFields, value, isValidDtField);

export function makeDt<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

@makeComponent(makeDt, 'dt', isValidDtField, DtFields, [], ['all-inline'])
export class DtNode extends BaseNode {
  static domNodeName = 'dt';
}
