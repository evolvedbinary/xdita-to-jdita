import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid, BasicValue } from "../utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { FieldFields, FieldNode, isValidBooleanFieldField, makeBooleanField } from "./field";
import { ClassFields, ClassNode, isValidClassField, makeClass } from "./class";

export const MediaMutedFields = [ ...LocalizationFields, ...FieldFields, ...ClassFields];
export interface MediaMutedNode extends LocalizationNode, FieldNode<boolean>, ClassNode {}
export const isValidMediaMutedField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidBooleanFieldField(field, value)
  || isValidClassField(field, value);
export const isMediaMutedNode = (value?: {}): value is MediaMutedNode =>
  typeof value === 'object' && areFieldsValid(MediaMutedFields, value, isValidMediaMutedField);

export function makeMediaMuted<T extends Constructor>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeBooleanField, makeClass);
}

@makeComponent(makeMediaMuted, 'media-muted', isValidMediaMutedField, MediaMutedFields)
export class MediaMutedNode extends BaseNode {}
