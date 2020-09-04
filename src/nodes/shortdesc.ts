import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, BasicValue } from "../utils";
import { BaseNode, makeComponent, makeAll, Constructor } from "./base";

export const ShortDescFields = [...FiltersFields, ...LocalizationFields, ...ClassFields];

export interface ShortDescNode extends FiltersNode, LocalizationNode, ClassNode { }

export const isValidShortDescField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);

export const isShortDescNode = (value?: {}): value is ShortDescNode =>
  typeof value === 'object' && areFieldsValid(ShortDescFields, value, isValidShortDescField);

export function makeShortDesc<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeClass);
}

@makeComponent(makeShortDesc, 'shortdesc', isValidShortDescField, ShortDescFields, [], ['all-inline'])
export class ShortDescNode extends BaseNode {
  static domNodeName = 'p';
}
