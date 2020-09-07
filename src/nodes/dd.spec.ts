import { doNodeTest } from "../tests";
import { DdNode, isDdNode } from "./dd";
doNodeTest(DdNode, 'dd', 'dd', 'dd', isDdNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  [],
  ['all-inline']);