import { doNodeTest } from "../tests";
import { DlNode, isDlNode } from "./dl";
doNodeTest(DlNode, 'dl', 'dl', 'dl', isDlNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['dlentry'],
  []);