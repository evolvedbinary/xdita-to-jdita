import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, BasicValue } from "../utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";

export const SimpleTableFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

export interface SimpleTableNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

export const isValidSimpleTableField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

export const isSimpleTableNode = (value?: {}): value is SimpleTableNode =>
  typeof value === 'object' && areFieldsValid(SimpleTableFields, value, isValidSimpleTableField);

export function makeSimpleTable<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

@makeComponent(makeSimpleTable, 'simpletable', isValidSimpleTableField, SimpleTableFields, ['sthead', 'strow'])
export class SimpleTableNode extends BaseNode { }
