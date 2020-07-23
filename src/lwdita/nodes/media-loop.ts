import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid,  } from "../utils";
import { makeComponent, BaseNode, makeAll } from "./base";
import { FieldFields, FieldNode, isValidBooleanFieldField, makeBooleanField } from "./field";
import { ClassFields, ClassNode, isValidClassField, makeClass } from "./class";

export const MediaLoopFields = [ ...LocalizationFields, ...FieldFields, ...ClassFields];
export interface MediaLoopNode extends LocalizationNode, FieldNode<boolean>, ClassNode {}
export const isValidMediaLoopField = (field: string, value: any): boolean => isValidLocalizationField(field, value)
  || isValidBooleanFieldField(field, value)
  || isValidClassField(field, value);
export const isMediaLoopNode = (value?: any): value is MediaLoopNode =>
  typeof value === 'object' && areFieldsValid(MediaLoopFields, value, isValidMediaLoopField);

export function makeMediaLoop<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeBooleanField, makeClass);
}

@makeComponent(makeMediaLoop, 'media-loop', isValidMediaLoopField, MediaLoopFields)
export class MediaLoopNode extends BaseNode {}
