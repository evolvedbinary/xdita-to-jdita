import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, BasicValue } from "../utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";

export const SectionFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];
export interface SectionNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode {}
export const isValidSectionField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);
export const isSectionNode = (value?: {}): value is SectionNode =>
  typeof value === 'object' && areFieldsValid(SectionFields, value, isValidSectionField);

export function makeSection<T extends Constructor>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

@makeComponent(makeSection, 'section', isValidSectionField, SectionFields, ['title'], ['all-blocks'])
export class SectionNode extends BaseNode {}
