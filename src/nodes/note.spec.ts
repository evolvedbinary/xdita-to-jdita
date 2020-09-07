import { doNodeTest } from "../tests";
import { NoteNode, isNoteNode } from "./note";
doNodeTest(NoteNode, 'note', 'note', 'div', isNoteNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class', 'type'],
  [],
  ['simple-blocks']);