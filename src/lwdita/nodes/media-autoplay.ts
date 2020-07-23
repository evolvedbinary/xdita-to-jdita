import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid,  } from "../utils";
import { makeComponent, BaseNode, makeAll } from "./base";
import { FieldFields, FieldNode, isValidBooleanFieldField, makeBooleanField } from "./field";
import { ClassFields, ClassNode, isValidClassField, makeClass } from "./class";

export const MediaAutoplayFields = [ ...LocalizationFields, ...FieldFields, ...ClassFields];
export interface MediaAutoplayNode extends LocalizationNode, FieldNode<boolean>, ClassNode {}
export const isValidMediaAutoplayField = (field: string, value: any): boolean => isValidLocalizationField(field, value)
  || isValidBooleanFieldField(field, value)
  || isValidClassField(field, value);
export const isMediaAutoplayNode = (value?: any): value is MediaAutoplayNode =>
  typeof value === 'object' && areFieldsValid(MediaAutoplayFields, value, isValidMediaAutoplayField);

export function makeMediaAutoplay<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeBooleanField, makeClass);
}

@makeComponent(makeMediaAutoplay, 'media-autoplay', isValidMediaAutoplayField, MediaAutoplayFields)
export class MediaAutoplayNode extends BaseNode {}
