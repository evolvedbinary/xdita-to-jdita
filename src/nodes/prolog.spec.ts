import { doNodeTest } from "../tests";
import { PrologNode, isPrologNode } from "./prolog";
doNodeTest(PrologNode, 'prolog', 'prolog', '', isPrologNode,
  ['dir', 'xml:lang', 'translate', 'props', 'class'],
  [],
  ['data']);