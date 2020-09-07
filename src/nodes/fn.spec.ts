import { doNodeTest } from "../tests";
import { FnNode, isFnNode } from "./fn";
doNodeTest(FnNode, 'fn', 'fn', 'span', isFnNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class', 'callout'],
  [],
  ['fn-blocks']);