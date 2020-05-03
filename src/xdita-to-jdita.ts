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
import StateMachine from "ts-javascript-state-machine";
import LifeCycle from "ts-javascript-state-machine";
//import StateMachine from '@taoqf/javascript-state-machine';

// TODO(AR) can we further refine these types?
type ID = String
type CDATA = String
type PCDATA = String
type NMTOKEN = String

// TODO(AR) should these be union types, or should they be base interfaces which other interfaces like `ph` inherit from?
type CommonInline = PCDATA | Ph | Image | Data
type AllInline = PCDATA | Ph | Image | XRef | Data

interface NamedElement {
    readonly elementName: String
}

interface FilterAdds {}

interface Filters extends FilterAdds {
    "@props"?: CDATA
}

interface Reuse {
    "@id"?: NMTOKEN
    "conref"?: CDATA
}

interface ReferenceContent {
    "@href"?: CDATA
    "@format"?: CDATA
    "@scope"?: "local" | "peer" | "external"
}

interface VariableContent {
    "@keyref?": CDATA
}

interface VariableLinks {
    "@keyref": CDATA
}

interface Localization {
    "@dir"?: CDATA
    "@xml:lang"?: CDATA
    "translate"?: CDATA
}

interface Topic extends NamedElement, Localization {
    "@id": ID
    "@xmlns:ditaarch": CDATA
    "@ditaarch:DITAArchVersion"?: CDATA
    "@domains"?: CDATA
    "@outputClass"?: CDATA
    "@class"?: CDATA

    //TODO(AR) how to ensure correct ordering of children here? also cannot have a shortdesc without a title! Need somelike like a HList
    title: Title
    shortdesc?: Shortdesc
    prolog?: Prolog
    body?: Body
}
class Topic {
    readonly elementName = "topic"
}

interface Title extends Localization {
    "@outputClass"?: CDATA
    "@class"?: CDATA
    children: Array<CommonInline>
}
class Title {
    readonly elementName = "Title"
}

interface Shortdesc extends Filters, Localization, Reuse {
    "@outputClass"?: CDATA
    "@class"?: CDATA
    children: Array<AllInline>
}
class Shortdesc {
    readonly elementName = "shortdesc"
}

interface Prolog extends Filters, Localization {
    "@class"?: CDATA
    children: Array<Data>
}
class Prolog {
    readonly elementName = "prolog"
}

interface Body extends Localization {
    "@outputClass"?: CDATA
    "@class"?: CDATA
    //TODO(AR) implement children
}
class Body {
    readonly elementName = "body"
}

interface Ph extends Filters, Localization, VariableContent {
    "@outputClass"?: CDATA
    "@class"?: CDATA
    children: Array<AllInline>
}
class Ph {
    readonly elementName = "ph"
}

interface Image extends Filters, Localization, ReferenceContent, VariableContent {
    "@height"?: NMTOKEN
    "@with"?: NMTOKEN
    "@outputClass"?: CDATA
    "@class"?: CDATA
    alt?: Alt
}
class Image {
    readonly elementName = "image"
}

interface Alt extends Filters, Localization, VariableContent {
    "@outputClass"?: CDATA
    "@class"?: CDATA
    children: Array<PCDATA | Ph | Data>
}
class Alt {
    readonly elementName = "alt"
}

interface Data extends  Filters, Localization, ReferenceContent, VariableContent {
    "@name"?: CDATA
    "@value"?: CDATA
    "@outputClass"?: CDATA
    "@class"?: CDATA
    children: Array<PCDATA | Data>
}
class Data {
    readonly elementName = "data"
}

interface XRef extends Filters, Localization, ReferenceContent, VariableLinks {
    "@outputClass"?: CDATA
    "@class"?: CDATA
    children: Array<CommonInline>   
}
class XRef {
    readonly elementName = "xref"
}

const lwditaFsm : StateMachine = new StateMachine({
    init: 'document',
    transitions: [
        { name: 'startTopic', from: 'document', to: 'topic' },
        { name: 'endTopic', from: 'topic', to: 'documentic' },

        { name: 'topicStartTitle', from: 'topic', to: 'topicTitle' },
        { name: 'topicEndTitle', from: 'topicTitle', to: 'topicWithTitle' },

        { name: 'topicStartShortdesc', from: 'topicWithTitle', to: 'shortdesc' },
        { name: 'topicEndShortdesc', from: 'shortdesc', to: 'topicWithTitle' },

        { name: 'topicStartProlog', from: 'topicWithTitle', to: 'prolog' },
        { name: 'topicEndPrology', from: 'prolog', to: 'topicWithTitle' },

        { name: 'topicStartBody', from: 'topicWithTitle', to: 'body' },
        { name: 'topicEndBody', from: 'body', to: 'topicWithTitle' },

        //{ name: 'topicTitle', from: 'topic', to: 'title' },

        { name: 'sectionStartTitle', from: 'section', to: 'sectionTitle' },
        { name: 'sectionEndTitle', from: 'sectionTitle', to: 'sectionWithTitle' }
    ],
    methods: {
        onInvalidTransition: function(transition: String, from: String, to: String) {
          if (to === undefined) {
            throw new Error("transition '" + transition + "' not allowed from: " + from);
          } else {
            throw new Error("transition '" + transition + "' not allowed from: " + from + " to: " + to);
          }
        },
        onStartTopic: function(lifecycle: LifeCycle, a1: String, a2: String) {
            console.log("CALLED START TOPIC" + a1 + " " + a2)
        }
    }
});


const printEvent = (description: string) => {
    console.log('Event: ' + description);
};

const parser = new saxes.SaxesParser({
    xmlns: true,
    fragment: false,
    position: true
});

parser.on("opentag", function (node: saxes.SaxesTagNS) {
    printEvent('Opened Tag: ' + node.name);
    
    if (node.local == "topic") {
        lwditaFsm.startTopic("x", "y");
    
    } else if (node.local == "title") {
        if (lwditaFsm.current == 'startTopic') {
            lwditaFsm.topicStartTitle();
        } else {
            lwditaFsm.sectionStartTitle();
        }
    }
});

parser.on("closetag", function (node: saxes.SaxesTagNS) {
    printEvent('Closed Tag: ' + node.name);

    if (node.local == "topic") {
        lwditaFsm.endTopic();

    } else if (node.local == "title") {
        if (lwditaFsm.current == 'startTopic') {
            lwditaFsm.topicEndTitle();
        } else {
            lwditaFsm.sectionendTitle();
        }
    }
});

parser
    .write('<topic><x><title>My Title</title></x><shortdesc>A short description</shortdesc></topic>')
    .close();
