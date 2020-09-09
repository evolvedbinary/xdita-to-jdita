import { doNodeTest } from "../tests";
import { FigNode, isFigNode } from "./fig";
doNodeTest(FigNode, 'fig', 'fig', 'figure', isFigNode,
  ['scale', 'frame', 'expanse', 'dir', 'xml:lang', 'translate', 'props', 'outputclass', 'class'],
  ['title?', 'desc?', '(%fig-blocks|image|xref)*']);