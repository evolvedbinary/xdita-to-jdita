import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, Attributes } from "../utils";
import { makeComponent, BaseNode, makeAll } from "./base";

export const SectionFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];
export interface SectionNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode {}
export const isValidSectionField = (field: string, value: any): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);
export const isSectionNode = (value?: any): value is SectionNode =>
  typeof value === 'object' && areFieldsValid(SectionFields, value, isValidSectionField);

export function makeSection<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

@makeComponent(makeSection, 'section', isValidSectionField, SectionFields, ['title'], ['all-blocks'])
export class SectionNode extends BaseNode {
  constructor(attributes?: Attributes) {
      super();
      this._props = this.attributesToProps(attributes);
  }
}
