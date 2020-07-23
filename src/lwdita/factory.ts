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
import { BaseNode, TextNode } from "./nodes";
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
export function createNode<T extends BaseNode = BaseNode>(node: XMLNode): T;
export function createNode<T extends BaseNode>(node: XMLNode | string): T {
  let nodeObject: BaseNode;
  if (typeof node === 'string') {
    nodeObject = new TextNode(node);
  } else {
    switch(node.name) {
      case 'topic': nodeObject = new TopicNode(node.attributes); break;
      case 'title': nodeObject = new TitleNode(node.attributes); break;
      case 'ph': nodeObject = new PhNode(node.attributes); break;
      case 'shortdesc': nodeObject = new ShortDescNode(node.attributes); break;
      case 'dl': nodeObject = new DlNode(node.attributes); break;
      case 'dlentry': nodeObject = new DlEntryNode(node.attributes); break;
      case 'dt': nodeObject = new DtNode(node.attributes); break;
      case 'dd': nodeObject = new DdNode(node.attributes); break;
      case 'body': nodeObject = new BodyNode(node.attributes); break;
      case 'p': nodeObject = new PNode(node.attributes); break;
      case 'image': nodeObject = new ImageNode(node.attributes); break;
      case 'alt': nodeObject = new AltNode(node.attributes); break;
      case 'fig': nodeObject = new FigNode(node.attributes); break;
      case 'section': nodeObject = new SectionNode(node.attributes); break;
      case 'ol': nodeObject = new OlNode(node.attributes); break;
      case 'ul': nodeObject = new UlNode(node.attributes); break;
      case 'li': nodeObject = new LiNode(node.attributes); break;
      case 'simpletable': nodeObject = new SimpleTableNode(node.attributes); break;
      case 'sthead': nodeObject = new StHeadNode(node.attributes); break;
      case 'strow': nodeObject = new StRowNode(node.attributes); break;
      case 'stentry': nodeObject = new StEntryNode(node.attributes); break;
      case 'prolog': nodeObject = new PrologNode(node.attributes); break;
      case 'data': nodeObject = new DataNode(node.attributes); break;
      case 'note': nodeObject = new NoteNode(node.attributes); break;
      case 'desc': nodeObject = new DescNode(node.attributes); break;
      case 'xref': nodeObject = new XRefNode(node.attributes); break;
      case 'audio': nodeObject = new AudioNode(node.attributes); break;
      default: 
        throw new Error('unkonwn node "' + node.name + '"');
    }
  }
  return nodeObject as T;
}
