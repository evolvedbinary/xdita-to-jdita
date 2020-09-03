import { TopicNode } from "./nodes/topic";
import { TitleNode } from "./nodes/title";
import { PhNode } from "./nodes/ph";
import { ShortDescNode } from "./nodes/shortdesc";
import { DlNode } from "./nodes/dl";
import { DlEntryNode } from "./nodes/dl-entry";
import { DtNode } from "./nodes/dt";
import { DdNode } from "./nodes/dd";
import { BodyNode } from "./nodes/body";
import { PNode } from "./nodes/p";
import { ImageNode } from "./nodes/image";
import { AltNode } from "./nodes/alt";
import { FigNode } from "./nodes/fig";
import { XMLNode } from "./utils";
import { BaseNode, TextNode, Constructor } from "./nodes";
import { SectionNode } from "./nodes/section";
import { LiNode } from "./nodes/li";
import { UlNode } from "./nodes/ul";
import { OlNode } from "./nodes/ol";
import { SimpleTableNode } from "./nodes/simple-table";
import { StHeadNode } from "./nodes/sthead";
import { StRowNode } from "./nodes/strow";
import { StEntryNode } from "./nodes/stentry";
import { PrologNode } from "./nodes/prolog";
import { DataNode } from "./nodes/data";
import { NoteNode } from "./nodes/note";
import { DescNode } from "./nodes/desc";
import { XRefNode } from "./nodes/xref";
import { AudioNode } from "./nodes/audio";
import { VideoNode } from "./nodes/video";
import { MediaControlsNode } from "./nodes/media-controls";
import { VideoPosterNode } from "./nodes/video-poster";
import { MediaAutoplayNode } from "./nodes/media-autoplay";
import { MediaLoopNode } from "./nodes/media-loop";
import { MediaMutedNode } from "./nodes/media-muted";
import { MediaSourceNode } from "./nodes/media-source";
import { MediaTrackNode } from "./nodes/media-track";
import { PreNode } from "./nodes/pre";
import { FnNode } from "./nodes/fn";

export class UnknownNodeError extends Error {
  name = 'unknown-node';
}

export function getNodeClass(name: string): Constructor {
  switch (name) {
    case 'topic': return TopicNode;
    case 'title': return TitleNode;
    case 'ph': return PhNode;
    case 'shortdesc': return ShortDescNode;
    case 'dl': return DlNode;
    case 'dlentry': return DlEntryNode;
    case 'dt': return DtNode;
    case 'dd': return DdNode;
    case 'body': return BodyNode;
    case 'p': return PNode;
    case 'image': return ImageNode;
    case 'alt': return AltNode;
    case 'fig': return FigNode;
    case 'section': return SectionNode;
    case 'ol': return OlNode;
    case 'ul': return UlNode;
    case 'li': return LiNode;
    case 'simpletable': return SimpleTableNode;
    case 'sthead': return StHeadNode;
    case 'strow': return StRowNode;
    case 'stentry': return StEntryNode;
    case 'prolog': return PrologNode;
    case 'data': return DataNode;
    case 'note': return NoteNode;
    case 'desc': return DescNode;
    case 'xref': return XRefNode;
    case 'audio': return AudioNode;
    case 'video': return VideoNode;
    case 'media-controls': return MediaControlsNode;
    case 'media-autoplay': return MediaAutoplayNode;
    case 'media-loop': return MediaLoopNode;
    case 'media-muted': return MediaMutedNode;
    case 'media-source': return MediaSourceNode;
    case 'media-track': return MediaTrackNode;
    case 'video-poster': return VideoPosterNode;
    case 'pre': return PreNode;
    case 'fn': return FnNode;
    default:
      throw new UnknownNodeError('unkonwn node "' + name + '"');
  }
}

export function getNodeClassType(name: string): typeof BaseNode {
  return getNodeClass(name) as unknown as typeof BaseNode;
}

export function createNode(content: string): TextNode;
export function createNode(node: XMLNode<'topic'>): TopicNode;
export function createNode(node: XMLNode<'title'>): TitleNode;
export function createNode(node: XMLNode<'ph'>): PhNode;
export function createNode(node: XMLNode<'shortdesc'>): ShortDescNode;
export function createNode(node: XMLNode<'dl'>): DlNode;
export function createNode(node: XMLNode<'dlentry'>): DlEntryNode;
export function createNode(node: XMLNode<'dt'>): DtNode;
export function createNode(node: XMLNode<'dd'>): DdNode;
export function createNode(node: XMLNode<'body'>): BodyNode;
export function createNode(node: XMLNode<'p'>): PNode;
export function createNode(node: XMLNode<'image'>): ImageNode;
export function createNode(node: XMLNode<'alt'>): AltNode;
export function createNode(node: XMLNode<'fig'>): FigNode;
export function createNode(node: XMLNode<'section'>): SectionNode;
export function createNode(node: XMLNode<'ol'>): OlNode;
export function createNode(node: XMLNode<'ul'>): UlNode;
export function createNode(node: XMLNode<'li'>): LiNode;
export function createNode(node: XMLNode<'simpletable'>): SimpleTableNode;
export function createNode(node: XMLNode<'sthead'>): StHeadNode;
export function createNode(node: XMLNode<'strow'>): StRowNode;
export function createNode(node: XMLNode<'stentry'>): StEntryNode;
export function createNode(node: XMLNode<'prolog'>): PrologNode;
export function createNode(node: XMLNode<'data'>): DataNode;
export function createNode(node: XMLNode<'note'>): NoteNode;
export function createNode(node: XMLNode<'desc'>): DescNode;
export function createNode(node: XMLNode<'xref'>): XRefNode;
export function createNode(node: XMLNode<'audio'>): AudioNode;
export function createNode(node: XMLNode<'video'>): VideoNode;
export function createNode(node: XMLNode<'media-controls'>): MediaControlsNode;
export function createNode(node: XMLNode<'media-autoplay'>): MediaAutoplayNode;
export function createNode(node: XMLNode<'media-loop'>): MediaLoopNode;
export function createNode(node: XMLNode<'media-muted'>): MediaMutedNode;
export function createNode(node: XMLNode<'media-source'>): MediaSourceNode;
export function createNode(node: XMLNode<'media-track'>): MediaTrackNode;
export function createNode(node: XMLNode<'video-poster'>): VideoPosterNode;
export function createNode(node: XMLNode<'pre'>): PreNode;
export function createNode(node: XMLNode<'fn'>): FnNode;
export function createNode<T extends BaseNode = BaseNode>(node: XMLNode): T;
export function createNode<T extends BaseNode>(node: XMLNode | string): T {
  let nodeObject: BaseNode;
  if (typeof node === 'string') {
    nodeObject = new TextNode(node);
  } else {
    const classType = getNodeClass(node.name);
    return new classType(node.attributes) as T;
  }
  return nodeObject as T;
}
