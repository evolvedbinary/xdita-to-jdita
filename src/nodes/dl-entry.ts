import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid, BasicValue } from "../utils";
import { BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { ReuseNode, isValidReuseField, ReuseFields, makeReuse } from "./reuse";

export const DlEntryFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

export interface DlEntryNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

export const isValidDlEntryField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

export const isDlEntryNode = (value?: {}): value is DlEntryNode =>
  typeof value === 'object' && areFieldsValid(DlEntryFields, value, isValidDlEntryField);

export function makeDlEntry<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

@makeComponent(makeDlEntry, 'dlentry', isValidDlEntryField, DlEntryFields, ['dt', 'dd'])
export class DlEntryNode extends BaseNode {
  // TODO: to be removed, make changes to 'dl'
  static domNodeName = '';
}
