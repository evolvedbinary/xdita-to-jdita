import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid } from "../utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { MediaAutoplayNode } from "./media-autoplay";
import { MediaControlsNode } from "./media-controls";
import { MediaLoopNode } from "./media-loop";
import { MediaMutedNode } from "./media-muted";
import { MediaTrackNode } from "./media-track";
import { MediaSourceNode } from "./media-source";
import { BasicValue } from "../classes";

export const AudioFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];

export interface AudioNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode { }

export const isValidAudioField = (field: string, value: BasicValue): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);

export const isAudioNode = (value?: {}): value is AudioNode =>
  typeof value === 'object' && areFieldsValid(AudioFields, value, isValidAudioField);

export function makeAudio<T extends Constructor>(constructor: T): T {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

@makeComponent(makeAudio, 'audio', isValidAudioField, AudioFields, ['desc?', 'media-controls?', 'media-autoplay?', 'media-loop?', 'media-muted?', 'media-source*', 'media-track*'])
export class AudioNode extends BaseNode {}
