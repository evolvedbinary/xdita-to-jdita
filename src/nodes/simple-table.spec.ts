import { doNodeTest } from "../tests";
import { SimpleTableNode, isSimpleTableNode } from "./simple-table";
doNodeTest(SimpleTableNode, 'simpletable', 'simpletable', 'table', isSimpleTableNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['sthead?', 'strow+']);