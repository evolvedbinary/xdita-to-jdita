import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode } from "./filters";
import { areFieldsValid, BasicValue } from "../utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";

// TODO:  "+ topic/ph hi-d/u "
export const UnderlinedFields = [...LocalizationFields, ...VariableContentFields, ...ClassFields];

export interface UnderlinedNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

export const isValidUnderlinedField = (field: string, value: BasicValue): boolean => isValidVariableContentField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);

export const isUnderlinedNode = (value?: {}): value is UnderlinedNode =>
  typeof value === 'object' && areFieldsValid(UnderlinedFields, value, isValidUnderlinedField);

export function makeUnderlined<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeVariableContent, makeClass);
}

@makeComponent(makeUnderlined, 'ul', isValidUnderlinedField, UnderlinedFields, [], ['all-inline'])
export class UnderlinedNode extends BaseNode {
  static domNodeName = 'u';
}
