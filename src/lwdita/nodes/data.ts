import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReferenceContentNode, ReferenceContentFields, isValidReferenceContentField, makeReferenceContent } from "./reference-content";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, Attributes, CDATA, isOrUndefined, isCDATA } from "../utils";
import { makeComponent, BaseNode, makeAll } from "./base";
import { VariableContentFields, VariableContentNode, isValidVariableContentField, makeVariableContent } from "./variable-content";

export const DataFields = [...FiltersFields, ...LocalizationFields, ...ReferenceContentFields, ...ClassFields, ...VariableContentFields];
export interface DataNode extends FiltersNode, LocalizationNode, ReferenceContentNode, ClassNode, VariableContentNode {
  'name'?: CDATA;
  'value'?: CDATA;
}
export function isValidDataField(field: string, value: any): boolean {
  if (isValidFiltersField(field, value) || isValidLocalizationField(field, value) || isValidReferenceContentField(field, value) || isValidVariableContentField(field, value) || isValidClassField(field, value)) {
    return true;
  }
  switch(field) {
    case 'name': return isOrUndefined(isCDATA, value);
    case 'value': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}
export const isDataNode = (value?: any): value is DataNode =>
  typeof value === 'object' && areFieldsValid(DataFields, value, isValidDataField);

export function makeData<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(class extends constructor {
    get 'name'(): CDATA {
      return this.readProp<CDATA>('name'); }
    set 'name'(value: CDATA) {
        this.writeProp<CDATA>('name', value); }
    get 'value'(): CDATA {
      return this.readProp<CDATA>('value'); }
    set 'value'(value: CDATA) {
        this.writeProp<CDATA>('value', value); }
  }, makeLocalization, makeFilters, makeReferenceContent, makeClass, makeVariableContent);
}

@makeComponent(makeData, 'data', isValidDataField, DataFields, ['text', 'data'])
export class DataNode extends BaseNode {
  constructor(attributes?: Attributes) {
      super();
      this._props = this.attributesToProps(attributes);
  }
}
