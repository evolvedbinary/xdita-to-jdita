import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode } from "./filters";
import { areFieldsValid, BasicValue } from "../utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";

// TODO:  "+ topic/ph hi-d/sup "
export const SuperscriptFields = [...LocalizationFields, ...VariableContentFields, ...ClassFields];

export interface SuperscriptNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

export const isValidSuperscriptField = (field: string, value: BasicValue): boolean => isValidVariableContentField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value);

export const isSuperscriptNode = (value?: {}): value is SuperscriptNode =>
  typeof value === 'object' && areFieldsValid(SuperscriptFields, value, isValidSuperscriptField);

export function makeSuperscript<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeVariableContent, makeClass);
}

@makeComponent(makeSuperscript, 'sup', isValidSuperscriptField, SuperscriptFields, ['%all-inline*'])
export class SuperscriptNode extends BaseNode {
  static domNodeName = 'sup';
}
