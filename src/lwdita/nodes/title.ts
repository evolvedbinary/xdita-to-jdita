import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid, Attributes } from "../utils";
import { BaseNode, makeComponent, makeAll } from "./base";

export const TitleFields = [...LocalizationFields, ...ClassFields];
export interface TitleNode extends LocalizationNode, ClassNode {}
export const isValidTitleField = (field: string, value: any): boolean => isValidLocalizationField(field, value)
  || isValidClassField(field, value);
export const isTitleNode = (value?: any): value is TitleNode =>
  typeof value === 'object' && areFieldsValid(TitleFields, value, isValidTitleField);

export function makeTitle<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeClass);
}

@makeComponent(makeTitle, 'title', isValidTitleField, TitleFields, [], ['common-inline'])
export class TitleNode extends BaseNode {}
