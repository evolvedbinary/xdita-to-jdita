import { DisplayNode, DisplayFields, isValidDisplayField, makeDisplay } from "./display";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { VariableContentNode, VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid, Attributes } from "../utils";
import { BaseNode, makeComponent, makeAll } from "./base";

export const FigFields = [...DisplayFields, ...LocalizationFields, ...VariableContentFields, ...ClassFields];
export interface FigNode extends DisplayNode, LocalizationNode, VariableContentNode, ClassNode {}
export const isValidFigField = (field: string, value: any): boolean => isValidDisplayField(field, value)
  || isValidLocalizationField(field, value)
  || isValidVariableContentField(field, value)
  || isValidClassField(field, value);
export const isFigNode = (value?: any): value is FigNode =>
  typeof value === 'object' && areFieldsValid(FigFields, value, isValidFigField);

export function makeFig<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeDisplay, makeVariableContent, makeClass);
}

@makeComponent(makeFig, 'fig', isValidFigField, FigFields, ['image', 'xref'], ['fig-blocks'])
export class FigNode extends BaseNode {
  constructor(attributes?: Attributes) {
      super();
      this._props = this.attributesToProps(attributes);
  }
}
