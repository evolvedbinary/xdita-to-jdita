import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { areFieldsValid, BasicValue } from "../utils";
import { makeComponent, BaseNode, makeAll, Constructor } from "./base";
import { SizeNode, SizeFields, isValidSizeField, makeSize } from "./size";
import { VideoPosterNode } from "./video-poster";
import { MediaAutoplayNode } from "./media-autoplay";
import { MediaControlsNode } from "./media-controls";
import { MediaLoopNode } from "./media-loop";
import { MediaMutedNode } from "./media-muted";
import { MediaTrackNode } from "./media-track";
import { MediaSourceNode } from "./media-source";

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
export class VideoNode extends BaseNode {
  get pmJson(): Record<string, BasicValue> {
    const attrs = { ...this._props };
    const content: BaseNode[] = [];
    if (this.children) {
      this.children.forEach(child => {
        if (child instanceof VideoPosterNode) {
          attrs.poster = true;
          return;
        }
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
      content,
    };
    return super.pmJson;
  }
}
