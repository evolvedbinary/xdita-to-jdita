import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReferenceContentNode, ReferenceContentFields, isValidReferenceContentField, makeReferenceContent } from "./reference-content";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, BasicValue } from "../utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { VariableContentFields, VariableContentNode, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { FieldFields, FieldNode, isValidCDATAFieldField, makeCDATAField } from "./field";

export const DataFields = [...FiltersFields, ...LocalizationFields, ...ReferenceContentFields, ...ClassFields, ...VariableContentFields, ...FieldFields];

export interface DataNode extends FiltersNode, LocalizationNode, ReferenceContentNode, ClassNode, VariableContentNode, FieldNode { }

export const isValidDataField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReferenceContentField(field, value)
  || isValidVariableContentField(field, value)
  || isValidClassField(field, value)
  || isValidCDATAFieldField(field, value);

export const isDataNode = (value?: {}): value is DataNode =>
  typeof value === 'object' && areFieldsValid(DataFields, value, isValidDataField);

export function makeData<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReferenceContent, makeClass, makeVariableContent, makeCDATAField);
}

@makeComponent(makeData, 'data', isValidDataField, DataFields, ['text'], ['data'])
export class DataNode extends BaseNode {
  static domNodeName = 'data';
}
