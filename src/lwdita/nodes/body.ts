import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid, Attributes } from "../utils";
import { BaseNode, makeComponent, makeAll } from "./base";

export const BodyFields = [...LocalizationFields, ...ClassFields];
export interface BodyNode extends LocalizationNode, ClassNode {}
export const isValidBodyField = (field: string, value: any): boolean => isValidLocalizationField(field, value)
  || isValidClassField(field, value);
export const isBodyNode = (value?: any): value is BodyNode =>
  typeof value === 'object' && areFieldsValid(BodyFields, value, isValidBodyField);

export function makeBody<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeClass);
}

@makeComponent(makeBody, 'body', isValidBodyField, BodyFields, ['section', 'fn'], ['list-blocks'])
export class BodyNode extends BaseNode {}
