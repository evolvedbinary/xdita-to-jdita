import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, Attributes } from "../utils";
import { makeComponent, BaseNode, makeAll } from "./base";

export const LiFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];
export interface LiNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode {}
export const isValidLiField = (field: string, value: any): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);
export const isLiNode = (value?: any): value is LiNode =>
  typeof value === 'object' && areFieldsValid(LiFields, value, isValidLiField);

export function makeLi<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

@makeComponent(makeLi, 'li', isValidLiField, LiFields, [], ['all-blocks'])
export class LiNode extends BaseNode {
  constructor(attributes?: Attributes) {
      super();
      this._props = this.attributesToProps(attributes);
  }
}
