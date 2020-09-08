import { doNodeTest } from "../tests";
import { OlNode, isOlNode } from "./ol";
doNodeTest(OlNode, 'ol', 'ol', 'ol', isOlNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['li+']);