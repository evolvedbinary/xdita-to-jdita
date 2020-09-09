import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { areFieldsValid } from "../utils";
import { BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { BasicValue } from "../classes";

export const BodyFields = [...LocalizationFields, ...ClassFields];

export interface BodyNode extends LocalizationNode, ClassNode { }

export const isValidBodyField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidClassField(field, value);

export const isBodyNode = (value?: {}): value is BodyNode =>
  typeof value === 'object' && areFieldsValid(BodyFields, value, isValidBodyField);

export function makeBody<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeClass);
}

@makeComponent(makeBody, 'body', isValidBodyField, BodyFields, ['%list-blocks*', 'section*', 'fn*'])
export class BodyNode extends BaseNode {
  static domNodeName = 'div';
}
