/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
/*!
XDITA to JDITA is a tool for converting LwDITA XDITA format to JDITA.
Copyright (C) 2020 Evolved Binary

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import * as saxes from "saxes";
import { BaseNode, DocumentNode, has, nodeGroups, TextNode } from "./jwdita";
import { createNode, getNodeClass, getNodeClassType } from "./jwdita/factory";
import { generateSchemaNodes, generateSchema } from "./jwdita/serializer";

class UnknownNode extends BaseNode {
  static nodeName = 'unknown';
  isValidField(field: string, value: any): boolean { return false; }
  // static canAdd(child: BaseNode): boolean {
  //     return true;
  // }
  add(child: BaseNode, breakOnError = false): void {
      console.log('skipped');
  }
}

let indent = '';
const  unknownNodes: string[] = [];

const parser = new saxes.SaxesParser({
    xmlns: true,
    fragment: false,
    position: true
});

const doc = new DocumentNode();
const stack: BaseNode[] = [ doc ];
const stack2: BaseNode[] = [];
function push(obj: BaseNode): void {
  (obj as any)['nodename'] = obj.static.nodeName;
  stack.push(obj);
  stack2.push(obj);
}
function last(): BaseNode {
  return stack[stack.length - 1];
}
function pop(): BaseNode | undefined {
  return stack.pop();
}
function find(fun: (obj: BaseNode) => boolean): BaseNode | undefined {
  for (let i = stack.length - 1; i > -1; i--) {
    if (fun(stack[i])) {
      return stack[i];
    }
  }
}
function findByName(name: string): BaseNode | undefined {
  return find(o => o.isNode(name));
}

parser.on("text", function (text) {
  last().add(createNode(text), false);
  console.log(indent + '*text');
  if (findByName('unknown')) {
    unknownNodes.push('*text');
  }
});

parser.on("opentag", function (node: saxes.SaxesTagNS) {
  console.log(indent + '+' + node.local);
  indent = indent + '| ';
  try {
    const obj = createNode(node);
    last().add(obj, false);
    push(obj);
    if (findByName('unknown')) {
      unknownNodes.push('*' + node.local);
    }
  } catch (e) {
    push(new UnknownNode());
    unknownNodes.push(node.local);
  }
});

parser.on("closetag", function (node: saxes.SaxesTagNS) {
  indent = indent.substr(2);
  console.log(indent + '\\' + node.local);
  pop();
});


const schema: any = generateSchemaNodes();

console.log('============================================================');
// console.log(JSON.stringify(schema));
console.log('============================================================');

// throw 'done';

parser
    // .write('<topic><title>My Title</title><shortdesc>A short description</shortdesc></topic>')
    // .write('<topic><x>content</x></topic>')
    .write(`<?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">
    <topic id="program-bulbs-to-groups">
      <title>Programming Light Bulbs to a Lighting Group</title>
      <shortdesc>You can program one or more light bulbs to a lighting group to operate that group
        with your remote control.</shortdesc>
      <body>
        <video width="320" height="240">
          <media-controls />
          <media-source src="movie.mp4" type="video/mp4" />
          <media-source src="movie.ogg" type="video/ogg" />
          Your browser does not support the video tag.
        </video>
        <section id="context">
          <p>Your <ph keyref="product-name"/> remote control can manage up to 250 network light bulbs on the same lighting
            network. When you add a light bulb to the network, you can program it to one or more
            lighting groups. You must assign a light bulb to at least one lighting group to
            operate that light bulb  A network light bulb that is not programmed to a
            lighting group will still operate when controlling all network light bulbs from
            the remote control.</p>
        </section>
        <section id="steps">
       <ol>
         <li><p>Make sure your <b>remote control</b> is in range of the <i>light bulbs</i> you are
            adding.</p></li>
         <li><p>If a network <u>light bulb</u> is new, you must install it by performing the following
              steps:</p>
              <ol>
                <li><p>Make sure <sup>power</sup> to the <sub>fixture</sub> where you are installing the light bulb
                  is turned OFF.
                  <image><alt>alt text</alt></image>
                  <image></image></p>
                  <p conref="intro-product.dita#intro-product/warning" />
    
                </li>
                  <li><p>Remove any existing light bulb from the light fixture.</p></li>
                  <li><p>Install the network light bulb into the light fixture as you would any
                  standard light bulb.</p></li>
                  <li><p>Turn power to the light fixture on.</p>
                  <p>The light bulb begins to brighten and dim while finding the
                  remote control's network.</p></li>
              <li><p>Repeat steps for each new network light bulb.</p></li>
              </ol></li>
            <li><p>Turn power on to the fixtures containing network light bulbs you want added to
              the light group.</p></li>
              <li><p>Turn power off to the fixtures containing light bulbs you do not want added to
              the light group. </p></li>
              <li><p>On the remote control, press and hold the desired lighting group button for 5
              seconds.</p>
            <p>The button indicator for the selected lighting group flashes green while
              the light bulb(s) are added to the group. If the indicator flashes red, the
              lighting group was not activated and you must try again. Light flashes red for 3
              seconds if programming fails.</p>
          </li>
          <li><p>Leave the light fixture switches ON so that power is available when using your
              remote control to turn the light bulbs on and off. Also remember to turn on any
              excluded fixtures that you turned off.</p></li>
        </ol>
        </section>
    
      </body>
    </topic>
    `)
    // .write('<topic id="intro-product"><title><ph keyref="product-name"/> Overview</title><shortdesc>The <ph keyref="product-name"/> kit allows you to operate network-based home lighting through a remote control</shortdesc></topic>')
    .close();
console.log('unknown nodes:', unknownNodes.length);
console.log(stack2);
console.log(unknownNodes);
console.log(JSON.stringify(doc.pmJson));
// console.log(stack2);
    // parser.

const t = createNode('asd');
console.log(t.content);