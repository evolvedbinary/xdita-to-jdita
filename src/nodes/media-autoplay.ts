import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid } from "../utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { FieldFields, FieldNode, isValidBooleanFieldField, makeBooleanField } from "./field";
import { ClassFields, ClassNode, isValidClassField, makeClass } from "./class";
import { BasicValue } from "../classes";

export const MediaAutoplayFields = [...LocalizationFields, ...FieldFields, ...ClassFields];

export interface MediaAutoplayNode extends LocalizationNode, FieldNode<boolean>, ClassNode { }

export const isValidMediaAutoplayField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidBooleanFieldField(field, value)
  || isValidClassField(field, value);

export const isMediaAutoplayNode = (value?: {}): value is MediaAutoplayNode =>
  typeof value === 'object' && areFieldsValid(MediaAutoplayFields, value, isValidMediaAutoplayField);

export function makeMediaAutoplay<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeBooleanField, makeClass);
}

@makeComponent(makeMediaAutoplay, 'media-autoplay', isValidMediaAutoplayField, MediaAutoplayFields)
export class MediaAutoplayNode extends BaseNode { }
