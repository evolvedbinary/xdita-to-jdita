import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode } from "./filters";
import { areFieldsValid, BasicValue } from "../utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";

// TODO:  "+ topic/ph hi-d/b "
export const BoldFields = [...LocalizationFields, ...VariableContentFields, ...ClassFields];

export interface BoldNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

export const isValidBoldField = (field: string, value: BasicValue): boolean => isValidVariableContentField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);

export const isBoldNode = (value?: {}): value is BoldNode =>
  typeof value === 'object' && areFieldsValid(BoldFields, value, isValidBoldField);

export function makeBold<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeVariableContent, makeClass);
}

@makeComponent(makeBold, 'b', isValidBoldField, BoldFields, [], ['all-inline'])
export class BoldNode extends BaseNode {
  static domNodeName = 'b';
}
