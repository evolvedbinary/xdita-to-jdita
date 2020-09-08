import { doNodeTest } from "../tests";
import { UnderlinedNode, isUnderlinedNode } from "./underlined";
doNodeTest(UnderlinedNode, 'u', 'u', 'u', isUnderlinedNode,
  ['dir', 'xml:lang', 'translate', 'keyref', 'outputclass', 'class'],
  ['%all-inline*']);