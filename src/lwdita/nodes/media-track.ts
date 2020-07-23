import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid,  } from "../utils";
import { makeComponent, BaseNode, makeAll } from "./base";
import { FieldFields, FieldNode, isValidBooleanFieldField, makeBooleanField } from "./field";
import { ClassFields, ClassNode, isValidClassField, makeClass } from "./class";

export const MediaTrackFields = [ ...LocalizationFields, ...FieldFields, ...ClassFields];
export interface MediaTrackNode extends LocalizationNode, FieldNode<boolean>, ClassNode {}
export const isValidMediaTrackField = (field: string, value: any): boolean => isValidLocalizationField(field, value)
  || isValidBooleanFieldField(field, value)
  || isValidClassField(field, value);
export const isMediaTrackNode = (value?: any): value is MediaTrackNode =>
  typeof value === 'object' && areFieldsValid(MediaTrackFields, value, isValidMediaTrackField);

export function makeMediaTrack<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeBooleanField, makeClass);
}

@makeComponent(makeMediaTrack, 'media-track', isValidMediaTrackField, MediaTrackFields)
export class MediaTrackNode extends BaseNode {}
