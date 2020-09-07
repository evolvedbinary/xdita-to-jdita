import { doNodeTest } from "../tests";
import { StRowNode, isStRowNode } from "./strow";
doNodeTest(StRowNode, 'strow', 'strow', 'tr', isStRowNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['stentry'],
  []);