import * as saxes from "saxes";
import { BaseNode, DocumentNode } from "./nodes";
import { createNode } from "./factory";
import { BasicValue } from "./classes";

export async function xditaToJdita(xml: string, abortOnError = true): Promise<DocumentNode> {
  return new Promise((resolve, reject) => {
    const errors: Error[] = [];
    const parser = new saxes.SaxesParser({
      xmlns: true,
      fragment: false,
      position: true
    });

    const doc = new DocumentNode();
    const stack: BaseNode[] = [doc];
    parser.on("text", function (text) {
      stack[stack.length - 1].add(createNode(text), false);
    });

    parser.on("opentag", function (node: saxes.SaxesTagNS) {
      try {
        const obj = createNode(node);
        stack[stack.length - 1].add(obj, false);
        stack.push(obj);
      } catch (e) {
        console.log('invalid:', e);
      }
    });

    parser.on("closetag", function () {
      stack.pop();
    });

    parser.on("end", function () {
      if (errors.length && abortOnError) {
        reject(errors);
      } else {
        resolve(doc);
      }
    });
    parser.on("error", function (e) {
      errors.push(e);
    });

    parser.write(xml).close();
  });
}

export async function xditaToJson(xml: string, abortOnError = true): Promise<Record<string, BasicValue>> {
  return xditaToJdita(xml, abortOnError).then(doc => doc.json);
}