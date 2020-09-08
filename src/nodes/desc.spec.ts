import { doNodeTest } from "../tests";
import { DescNode, isDescNode } from "./desc";
// TODO: caption/figcaption
doNodeTest(DescNode, 'desc', 'desc', 'caption', isDescNode,
  ['dir', 'xml:lang', 'translate', 'props', 'outputclass', 'class'],
  ['%common-inline*']);