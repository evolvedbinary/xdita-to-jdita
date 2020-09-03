import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, BasicValue } from "../utils";
import { BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { ReferenceContentFields, ReferenceContentNode, isValidReferenceContentField, makeReferenceContent } from "./reference-content";
import { VariableContentFields, VariableContentNode, isValidVariableContentField, makeVariableContent } from "./variable-content";

export const XRefFields = [...FiltersFields, ...LocalizationFields, ...ClassFields, ...ReferenceContentFields, ...VariableContentFields];

export interface XRefNode extends FiltersNode, LocalizationNode, ClassNode, ReferenceContentNode, VariableContentNode { }

export const isValidXRefField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidClassField(field, value)
  || isValidReferenceContentField(field, value)
  || isValidVariableContentField(field, value);

export const isXRefNode = (value?: {}): value is XRefNode =>
  typeof value === 'object' && areFieldsValid(XRefFields, value, isValidXRefField);

export function makeXRef<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeClass, makeReferenceContent, makeVariableContent);
}

@makeComponent(makeXRef, 'xref', isValidXRefField, XRefFields, [], ['common-inline'])
export class XRefNode extends BaseNode {
  static domNodeName = 'a';
}
