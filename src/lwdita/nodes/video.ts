import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid, Attributes, NMTOKEN, isOrUndefined, isNMTOKEN } from "../utils";
import { makeComponent, BaseNode, makeAll } from "./base";
import { SizeNode, SizeFields, isValidSizeField, makeSize } from "./size";

export const VideoFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields, ...SizeFields];
export interface VideoNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode, SizeNode {}
export const isValidVideoField = (field: string, value: any): boolean  => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value)
  || isValidSizeField(field, value);

export const isVideoNode = (value?: any): value is VideoNode =>
  typeof value === 'object' && areFieldsValid(VideoFields, value, isValidVideoField);

export function makeVideo<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass, makeSize);
}

@makeComponent(makeVideo, 'video', isValidVideoField, VideoFields, ['desc', 'video-poster', 'media-control', 'media-autoplay', 'media-loop', 'media-muted', 'media-source', 'media-track'])
export class VideoNode extends BaseNode {}
