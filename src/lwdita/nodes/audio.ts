import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid, BasicValue } from "../utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { MediaAutoplayNode } from "./media-autoplay";
import { MediaControlsNode } from "./media-controls";
import { MediaLoopNode } from "./media-loop";
import { MediaMutedNode } from "./media-muted";
import { MediaTrackNode } from "./media-track";
import { MediaSourceNode } from "./media-source";

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

@makeComponent(makeAudio, 'audio', isValidAudioField, AudioFields, ['desc', 'media-controls', 'media-autoplay', 'media-loop', 'media-muted', 'media-source', 'media-track'])
export class AudioNode extends BaseNode {
  static domNodeName = 'audio';
  get pmJson(): Record<string, BasicValue> {
    const attrs = { ...this._props };
    const content: BaseNode[] = [];
    if (this.children) {
      this.children.forEach(child => {
        if (child instanceof MediaAutoplayNode) {
          attrs.autoplay = true;
          return;
        }
        if (child instanceof MediaControlsNode) {
          attrs.controls = true;
          return;
        }
        if (child instanceof MediaLoopNode) {
          attrs.loop = true;
          return;
        }
        if (child instanceof MediaMutedNode) {
          attrs.muted = true;
          return;
        }
        if (child instanceof MediaTrackNode) {
          attrs.track = true;
          return;
        }
        if (child instanceof MediaSourceNode) {
          content.push(child)
        }
      });
    }
    return {
      type: this.static.nodeType.replace(/-/g, '_'),
      attrs: attrs,
      content: content.map(source => source.pmJson),
    };
  }
}
