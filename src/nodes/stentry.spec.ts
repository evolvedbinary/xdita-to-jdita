import { doNodeTest } from "../tests";
import { StEntryNode, isStEntryNode } from "./stentry";
// TODO: td/th
doNodeTest(StEntryNode, 'stentry', 'stentry', 'td', isStEntryNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  [],
  ['simple-blocks']);