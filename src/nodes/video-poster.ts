import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid } from "../utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { FieldFields, FieldNode, isValidBooleanFieldField, makeBooleanField } from "./field";
import { ClassFields, ClassNode, isValidClassField, makeClass } from "./class";
import { BasicValue } from "../classes";

export const VideoPosterFields = [...LocalizationFields, ...FieldFields, ...ClassFields];

export interface VideoPosterNode extends LocalizationNode, FieldNode<boolean>, ClassNode { }

export const isValidVideoPosterField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidBooleanFieldField(field, value)
  || isValidClassField(field, value);

export const isVideoPosterNode = (value?: {}): value is VideoPosterNode =>
  typeof value === 'object' && areFieldsValid(VideoPosterFields, value, isValidVideoPosterField);

export function makeVideoPoster<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeBooleanField, makeClass);
}

@makeComponent(makeVideoPoster, 'video-poster', isValidVideoPosterField, VideoPosterFields)
export class VideoPosterNode extends BaseNode { }
