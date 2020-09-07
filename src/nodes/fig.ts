import { DisplayNode, DisplayFields, isValidDisplayField, makeDisplay } from "./display";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid, BasicValue } from "../utils";
import { BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { FiltersFields, FiltersNode, isValidFiltersField, makeFilters } from "./filters";

export const FigFields = [...DisplayFields, ...LocalizationFields, ...FiltersFields, ...ClassFields];

export interface FigNode extends DisplayNode, LocalizationNode, FiltersNode, ClassNode { }

export const isValidFigField = (field: string, value: BasicValue): boolean => isValidDisplayField(field, value)
  || isValidLocalizationField(field, value)
  || isValidFiltersField(field, value)
  || isValidClassField(field, value);

export const isFigNode = (value?: {}): value is FigNode =>
  typeof value === 'object' && areFieldsValid(FigFields, value, isValidFigField);

export function makeFig<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeDisplay, makeFilters, makeClass);
}

@makeComponent(makeFig, 'fig', isValidFigField, FigFields, ['title', 'desc', 'image', 'xref'], ['fig-blocks'])
export class FigNode extends BaseNode {
  static domNodeName = 'figure';
}
