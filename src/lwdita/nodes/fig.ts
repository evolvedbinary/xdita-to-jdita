import { DisplayNode, DisplayFields, isValidDisplayField, makeDisplay } from "./display";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { VariableContentNode, VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid, BasicValue } from "../utils";
import { BaseNode, makeComponent, makeAll, Constructor } from "./base";

export const FigFields = [...DisplayFields, ...LocalizationFields, ...VariableContentFields, ...ClassFields];

export interface FigNode extends DisplayNode, LocalizationNode, VariableContentNode, ClassNode { }

export const isValidFigField = (field: string, value: BasicValue): boolean => isValidDisplayField(field, value)
  || isValidLocalizationField(field, value)
  || isValidVariableContentField(field, value)
  || isValidClassField(field, value);

export const isFigNode = (value?: {}): value is FigNode =>
  typeof value === 'object' && areFieldsValid(FigFields, value, isValidFigField);

export function makeFig<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeDisplay, makeVariableContent, makeClass);
}

@makeComponent(makeFig, 'fig', isValidFigField, FigFields, ['image', 'xref'], ['fig-blocks'])
export class FigNode extends BaseNode {
  static domNodeName = 'figure';
}
