import { doNodeTest } from "../tests";
import { BoldNode, isBoldNode } from "./bold";
doNodeTest(BoldNode, 'b', 'b', 'b', isBoldNode,
  ['dir', 'xml:lang', 'translate', 'keyref', 'outputclass', 'class'],
  [],
  ['all-inline']);