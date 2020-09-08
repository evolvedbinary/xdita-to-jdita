import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid, BasicValue, isOrUndefined, isCDATA, CDATA } from "../utils";
import { makeComponent, BaseNode, makeAll } from "./base";
import { FieldFields, FieldNode, isValidBooleanFieldField, makeBooleanField } from "./field";
import { ClassFields, ClassNode, isValidClassField, makeClass } from "./class";

export const MediaTrackFields = [...LocalizationFields, ...FieldFields, ...ClassFields, 'type'];

export interface MediaTrackNode extends LocalizationNode, FieldNode<boolean>, ClassNode { }

export const isValidMediaTrackField = (field: string, value: BasicValue): boolean => {
  if (isValidLocalizationField(field, value)
  || isValidBooleanFieldField(field, value)
  || isValidClassField(field, value)) {
    return true;
  }
  switch (field) {
    case 'type': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

export const isMediaTrackNode = (value?: {}): value is MediaTrackNode =>
  typeof value === 'object' && areFieldsValid(MediaTrackFields, value, isValidMediaTrackField);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeMediaTrack<T extends { new(...args: any[]): BaseNode }>(constructor: T): T {
  return makeAll(class extends constructor {
    get 'type'(): CDATA {
      return this.readProp<CDATA>('type'); }
    set 'type'(value: CDATA) {
        this.writeProp<CDATA>('type', value); }
  }, makeLocalization, makeBooleanField, makeClass);
}

@makeComponent(makeMediaTrack, 'media-track', isValidMediaTrackField, MediaTrackFields)
export class MediaTrackNode extends BaseNode { }
