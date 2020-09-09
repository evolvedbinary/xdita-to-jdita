import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid } from "../utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { FieldFields, FieldNode, isValidBooleanFieldField, makeBooleanField } from "./field";
import { ClassFields, ClassNode, isValidClassField, makeClass } from "./class";
import { BasicValue } from "../classes";

export const MediaSourceFields = [...LocalizationFields, ...FieldFields, ...ClassFields];

export interface MediaSourceNode extends LocalizationNode, FieldNode<boolean>, ClassNode { }

export const isValidMediaSourceField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidBooleanFieldField(field, value)
  || isValidClassField(field, value);

export const isMediaSourceNode = (value?: {}): value is MediaSourceNode =>
  typeof value === 'object' && areFieldsValid(MediaSourceFields, value, isValidMediaSourceField);

export function makeMediaSource<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeBooleanField, makeClass);
}

@makeComponent(makeMediaSource, 'media-source', isValidMediaSourceField, MediaSourceFields)
export class MediaSourceNode extends BaseNode {
  static domNodeName = 'source';
}
