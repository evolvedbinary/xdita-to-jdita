import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid,  } from "../utils";
import { makeComponent, BaseNode, makeAll } from "./base";
import { FieldFields, FieldNode, isValidBooleanFieldField, makeBooleanField } from "./field";
import { ClassFields, ClassNode, isValidClassField, makeClass } from "./class";

export const MediaControlsFields = [ ...LocalizationFields, ...FieldFields, ...ClassFields];
export interface MediaControlsNode extends LocalizationNode, FieldNode<boolean>, ClassNode {}
export const isValidMediaControlsField = (field: string, value: any): boolean => isValidLocalizationField(field, value)
  || isValidBooleanFieldField(field, value)
  || isValidClassField(field, value);
export const isMediaControlsNode = (value?: any): value is MediaControlsNode =>
  typeof value === 'object' && areFieldsValid(MediaControlsFields, value, isValidMediaControlsField);

export function makeMediaControls<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeBooleanField, makeClass);
}

@makeComponent(makeMediaControls, 'media-controls', isValidMediaControlsField, MediaControlsFields)
export class MediaControlsNode extends BaseNode {}
