import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid, Attributes } from "../utils";
import { makeComponent, BaseNode, makeAll } from "./base";

export const AudioFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];
export interface AudioNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode {}
export const isValidAudioField = (field: string, value: any): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);
export const isAudioNode = (value?: any): value is AudioNode =>
  typeof value === 'object' && areFieldsValid(AudioFields, value, isValidAudioField);

export function makeAudio<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return makeAll(constructor, makeLocalization, makeFilters, makeReuse, makeClass);
}

@makeComponent(makeAudio, 'audio', isValidAudioField, AudioFields, ['desc', 'media-control', 'media-autoplay', 'media-loop', 'media-muted', 'media-source', 'media-track'])
export class AudioNode extends BaseNode {}
