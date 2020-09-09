import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid } from "../utils";
import { BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { ReuseFields, ReuseNode, isValidReuseField, makeReuse } from "./reuse";
import { BasicValue } from "../classes";

export const DdFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

export interface DdNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

export const isValidDdField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

export const isDdNode = (value?: {}): value is DdNode =>
  typeof value === 'object' && areFieldsValid(DdFields, value, isValidDdField);

export function makeDd<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

@makeComponent(makeDd, 'dd', isValidDdField, DdFields, ['%list-blocks*'])
export class DdNode extends BaseNode {
  static domNodeName = 'dd';
}
