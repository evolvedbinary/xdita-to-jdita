import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid, Attributes, NMTOKEN, isOrUndefined, isNMTOKEN } from "../utils";
import { makeComponent, BaseNode, makeAll } from "./base";

export const VideoFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];
export interface VideoNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode {}
export function isValidVideoField(field: string, value: any): boolean {
  if (isValidFiltersField(field, value) || isValidLocalizationField(field, value) || isValidReuseField(field, value) || isValidClassField(field, value)) {
    return true;
  }
  switch(field) {
    case 'height': return isOrUndefined(isNMTOKEN, value);
    case 'width': return isOrUndefined(isNMTOKEN, value);
    default: return false;
  }
}

export const isVideoNode = (value?: any): value is VideoNode =>
  typeof value === 'object' && areFieldsValid(VideoFields, value, isValidVideoField);

export function makeVideo<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(class extends constructor {
    get 'height'(): NMTOKEN | undefined {
      return this.readProp<NMTOKEN | undefined>('height'); }
    set 'height'(value: NMTOKEN | undefined) {
        this.writeProp<NMTOKEN | undefined>('height', value); }
    get 'width'(): NMTOKEN | undefined {
      return this.readProp<NMTOKEN | undefined>('width'); }
    set 'width'(value: NMTOKEN | undefined) {
        this.writeProp<NMTOKEN | undefined>('width', value); }
  }, makeLocalization, makeFilters, makeReuse, makeClass);
}

@makeComponent(makeVideo, 'video', isValidVideoField, VideoFields, ['desc', 'video-poster', 'media-control', 'media-autoplay', 'media-loop', 'media-muted', 'media-source', 'media-track'])
export class VideoNode extends BaseNode {}
