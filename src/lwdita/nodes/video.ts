import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid, BasicValue } from "../utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { SizeNode, SizeFields, isValidSizeField, makeSize } from "./size";

export const VideoFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields, ...SizeFields];

export interface VideoNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode, SizeNode { }

export const isValidVideoField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value)
  || isValidSizeField(field, value);

export const isVideoNode = (value?: {}): value is VideoNode =>
  typeof value === 'object' && areFieldsValid(VideoFields, value, isValidVideoField);

export function makeVideo<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass, makeSize);
}

@makeComponent(makeVideo, 'video', isValidVideoField, VideoFields, ['desc', 'video-poster', 'media-controls', 'media-autoplay', 'media-loop', 'media-muted', 'media-source', 'media-track'])
export class VideoNode extends BaseNode { }
