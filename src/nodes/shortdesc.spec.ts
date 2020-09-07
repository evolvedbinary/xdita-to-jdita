import { doNodeTest } from "../tests";
import { ShortDescNode, isShortDescNode } from "./shortdesc";
doNodeTest(ShortDescNode, 'shortdesc', 'shortdesc', 'p', isShortDescNode,
  ['dir', 'xml:lang', 'translate', 'props', 'outputclass', 'class'],
  [],
  ['all-inline']);