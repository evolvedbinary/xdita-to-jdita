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
export function createNode(node: XMLNode): BaseNode;
export function createNode(node: XMLNode | string): BaseNode {
    if (typeof node === 'string') {
      return new TextNode(node);
    }
    switch(node.name) {
      case 'topic': return new TopicNode(node.attributes);
      case 'title': return new TitleNode(node.attributes);
      case 'ph': return new PhNode(node.attributes);
      case 'shortdesc': return new ShortDescNode(node.attributes);
      case 'dl': return new DlNode(node.attributes);
      case 'dlentry': return new DlEntryNode(node.attributes);
      case 'dt': return new DtNode(node.attributes);
      case 'dd': return new DdNode(node.attributes);
      case 'body': return new BodyNode(node.attributes);
      case 'p': return new PNode(node.attributes);
      case 'image': return new ImageNode(node.attributes);
      case 'alt': return new AltNode(node.attributes);
      case 'fig': return new FigNode(node.attributes);
      case 'section': return new SectionNode(node.attributes);
      case 'ol': return new OlNode(node.attributes);
      case 'ul': return new UlNode(node.attributes);
      case 'li': return new LiNode(node.attributes);
      case 'simpletable': return new SimpleTableNode(node.attributes);
      case 'sthead': return new StHeadNode(node.attributes);
      case 'strow': return new StRowNode(node.attributes);
      case 'stentry': return new StEntryNode(node.attributes);
      case 'prolog': return new PrologNode(node.attributes);
      default: 
        throw new Error('unkonwn node "' + node.name + '"');
    }
    
}
