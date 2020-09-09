import { doNodeTest } from "../tests";
import { PreNode, isPreNode } from "./pre";
doNodeTest(PreNode, 'pre', 'pre', 'pre', isPreNode,
  ['xml:space', 'dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['(text|%ph|xref|%data)*']);