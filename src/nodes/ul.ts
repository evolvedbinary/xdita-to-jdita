import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, BasicValue } from "../utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";

export const UlFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

export interface UlNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

export const isValidUlField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

export const isUlNode = (value?: {}): value is UlNode =>
  typeof value === 'object' && areFieldsValid(UlFields, value, isValidUlField);

export function makeUl<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

@makeComponent(makeUl, 'ul', isValidUlField, UlFields, ['li+'])
export class UlNode extends BaseNode {
  static domNodeName = 'ul';
}
