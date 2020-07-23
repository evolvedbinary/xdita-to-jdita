import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid,  } from "../utils";
import { makeComponent, BaseNode, makeAll } from "./base";
import { FieldFields, FieldNode, isValidBooleanFieldField, makeBooleanField } from "./field";
import { ClassFields, ClassNode, isValidClassField, makeClass } from "./class";

export const MediaSourceFields = [ ...LocalizationFields, ...FieldFields, ...ClassFields];
export interface MediaSourceNode extends LocalizationNode, FieldNode<boolean>, ClassNode {}
export const isValidMediaSourceField = (field: string, value: any): boolean => isValidLocalizationField(field, value)
  || isValidBooleanFieldField(field, value)
  || isValidClassField(field, value);
export const isMediaSourceNode = (value?: any): value is MediaSourceNode =>
  typeof value === 'object' && areFieldsValid(MediaSourceFields, value, isValidMediaSourceField);

export function makeMediaSource<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeBooleanField, makeClass);
}

@makeComponent(makeMediaSource, 'media-source', isValidMediaSourceField, MediaSourceFields)
export class MediaSourceNode extends BaseNode {}
