import { doNodeTest } from "../tests";
import { MediaAutoplayNode, isMediaAutoplayNode } from "./media-autoplay";
doNodeTest(MediaAutoplayNode, 'media-autoplay', 'media-autoplay', '', isMediaAutoplayNode,
  ['dir', 'xml:lang', 'translate', 'name', 'value', 'outputclass', 'class'],
  [],
  []);