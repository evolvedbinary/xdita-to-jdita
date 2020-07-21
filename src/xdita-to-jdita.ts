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
import { Topic, BaseElement, Title, Paragraph, Ph, TextNode, DocumentNode, ShortDesc, DL, DLEntry, Body, DD, DT, ImageNode } from "./lwdita";

class UnknownNode extends BaseElement {
  static nodeName = 'unknown';
  isValidField(field: string, value: any): boolean { return false; }
  // static canAdd(child: BaseElement): boolean {
  //     return true;
  // }
  add(child: BaseElement, breakOnError = false): void {
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
const stack: BaseElement[] = [ doc ];
const stack2: BaseElement[] = [];
function push(obj: BaseElement): void {
  stack.push(obj);
  stack2.push(obj);
}
function last(): BaseElement {
  return stack[stack.length - 1];
}
function pop(): BaseElement | undefined {
  return stack.pop();
}
function find(fun: (obj: BaseElement) => boolean): BaseElement | undefined {
  for (let i = stack.length - 1; i > -1; i--) {
    if (fun(stack[i])) {
      return stack[i];
    }
  }
}
function findByName(name: string): BaseElement | undefined {
  return find(o => o.isNode(name));
}

parser.on("text", function (text) {
  last().add(new TextNode(text), false);
  console.log(indent + '*text');
  if (findByName('unknown')) {
    unknownNodes.push('*text');
  }
});

parser.on("opentag", function (node: saxes.SaxesTagNS) {
  console.log(indent + '+' + node.local);
  indent = indent + '| ';
  let obj;
  switch(node.local) {
    case 'topic': obj = new Topic(node.attributes); break;
    case 'title': obj = new Title(node.attributes); break;
    case 'ph': obj = new Ph(node.attributes); break;
    case 'shortdesc': obj = new ShortDesc(node.attributes); break;
    case 'dl': obj = new DL(node.attributes); break;
    case 'dlentry': obj = new DLEntry(node.attributes); break;
    case 'dt': obj = new DT(node.attributes); break;
    case 'dd': obj = new DD(node.attributes); break;
    case 'body': obj = new Body(node.attributes); break;
    case 'p': obj = new Paragraph(node.attributes); break;
    case 'image': obj = new ImageNode(node.attributes); break;
    default: 
      push(new UnknownNode());
      unknownNodes.push(node.local);
      return;
  }
  last().add(obj, false);
  push(obj);
  if (findByName('unknown')) {
    unknownNodes.push('*' + node.local);
  }
});

parser.on("closetag", function (node: saxes.SaxesTagNS) {
  indent = indent.substr(2);
  console.log(indent + '\\' + node.local);
  pop();
});

parser
    // .write('<topic><x><title>My Title</title></x><shortdesc>A short description</shortdesc></topic>')
    // .write('<topic><x>content</x></topic>')
    .write(`<?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">
    <topic id="intro-product">
      <title><ph keyref="product-name"/> Overview</title>
      <shortdesc>The <ph keyref="product-name"/> kit allows you to operate network-based home lighting through a remote control</shortdesc>
      <body>
        <p>The <ph keyref="product-name"/> kit includes a wireless smart lighting system that helps make the lighting in your home more energy efficient and easier to manage. The kit includes the following
        components:</p>
        <dl>
          <dlentry>
            <dt>Remote Control</dt>
            <dd><p>Allows you to power on, power off, and dim groups of lights on your network.</p></dd>
          </dlentry>
          <dlentry>
            <dt>LED Light Bulbs</dt>
            <dd><p>Energy-efficient network light bulbs you can install into standard light fixtures.</p></dd>
          </dlentry>
            </dl>
        <fig>
          <title><ph keyref="product-name"/> ready for installation</title>
          <image href="../images/kit.png"><alt>Remote Lighting Kit</alt></image>
         </fig>
    
        <p id="warning">Electrical hazards can cause burns, shocks and electrocution (death).</p>
    
      </body>
    </topic>`)
    // .write('<topic id="intro-product"><title><ph keyref="product-name"/> Overview</title><shortdesc>The <ph keyref="product-name"/> kit allows you to operate network-based home lighting through a remote control</shortdesc></topic>')
    .close();
console.log('unknown nodes:', unknownNodes.length);
console.log(unknownNodes);
console.log(JSON.stringify(doc.json, null, 2));
// console.log(stack2);
    // parser.