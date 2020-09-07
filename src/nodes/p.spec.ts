import { doNodeTest } from "../tests";
import { PNode, isPNode } from "./p";
doNodeTest(PNode, 'p', 'p', 'p', isPNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  [],
  ['all-inline']);