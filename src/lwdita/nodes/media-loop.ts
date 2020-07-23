import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid, BasicValue } from "../utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { FieldFields, FieldNode, isValidBooleanFieldField, makeBooleanField } from "./field";
import { ClassFields, ClassNode, isValidClassField, makeClass } from "./class";

export const MediaLoopFields = [ ...LocalizationFields, ...FieldFields, ...ClassFields];
export interface MediaLoopNode extends LocalizationNode, FieldNode<boolean>, ClassNode {}
export const isValidMediaLoopField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidBooleanFieldField(field, value)
  || isValidClassField(field, value);
export const isMediaLoopNode = (value?: {}): value is MediaLoopNode =>
  typeof value === 'object' && areFieldsValid(MediaLoopFields, value, isValidMediaLoopField);

export function makeMediaLoop<T extends Constructor>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeBooleanField, makeClass);
}

@makeComponent(makeMediaLoop, 'media-loop', isValidMediaLoopField, MediaLoopFields)
export class MediaLoopNode extends BaseNode {}
