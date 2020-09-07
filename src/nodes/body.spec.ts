import { doNodeTest } from "../tests";
import { BodyNode, isBodyNode } from "./body";
doNodeTest(BodyNode, 'body', 'body', 'div', isBodyNode,
  ['dir', 'xml:lang', 'translate', 'outputclass', 'class'],
  ['section', 'fn'],
  ['list-blocks']);