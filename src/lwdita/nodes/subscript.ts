import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode } from "./filters";
import { areFieldsValid, BasicValue } from "../utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";

// TODO:  "+ topic/ph hi-d/sub "
export const SubscriptFields = [...LocalizationFields, ...VariableContentFields, ...ClassFields];

export interface SubscriptNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

export const isValidSubscriptField = (field: string, value: BasicValue): boolean => isValidVariableContentField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);

export const isSubscriptNode = (value?: {}): value is SubscriptNode =>
  typeof value === 'object' && areFieldsValid(SubscriptFields, value, isValidSubscriptField);

export function makeSubscript<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeVariableContent, makeClass);
}

@makeComponent(makeSubscript, 'sub', isValidSubscriptField, SubscriptFields, [], ['all-inline'])
export class SubscriptNode extends BaseNode {
  static domNodeName = 'sub';
}
