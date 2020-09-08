import { doNodeTest } from "../tests";
import { StHeadNode, isStHeadNode } from "./sthead";
doNodeTest(StHeadNode, 'sthead', 'sthead', 'thead', isStHeadNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['stentry+']);