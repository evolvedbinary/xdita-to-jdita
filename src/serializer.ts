import { BaseNode, DocumentNode } from "./nodes";
import { has } from "./utils";
import { getNodeClassType } from "./factory";
import { UnknownNodeError } from "./classes";

export interface SchemaNode {
  inline?: boolean;
  content?: string;
  group?: string;
  domNodeName?: string;
  attrs?: Record<string, { default: string }>;
}
export interface SchemaNodes {
  [key: string]: SchemaNode;
}

export function generateSchemaNodes(): SchemaNodes {
  const done: string[] = [];
  const schema: SchemaNodes = {
    text: {},
    'text_node': {
      domNodeName: 'span',
      content: 'text*',
    },
  };

  function browse(node: string | typeof BaseNode): void {
    const nodeName = typeof node === 'string' ? node : node.nodeName;
    if (has(done, nodeName)) {
      return;
    }
    console.log('= ' + nodeName);
    done.push(nodeName);
    if (has(['document', 'alt', 'text'], node)) {
      return;
    }
    try {
      const NodeClass = typeof node === 'string' ? getNodeClassType(node) : node;
      const resultNodename = nodeName === 'document' ? 'doc' : nodeName.replace(/-/g, '_');
      const result = NodeClass.pmSchema(browse);
      if (result) {
        schema[resultNodename] = result;
      }
    } catch (e) {
      if (e instanceof UnknownNodeError) {
        console.log(`  unknown: ${node}.`);
      } else {
        console.log('  unknown error.');
        console.error(node);
        console.error(e);
      }
    }
  }
  browse(DocumentNode);
  return schema;
}

export interface Schema {
  nodes: {
    [key: string]: SchemaNode & {
      toDom?: (node: { attrs: Record<string, string> }) => [string, Record<string, string>, 0];
      parseDom?: [{
        tag: string;
        getAttrs: (dom: HTMLElement) => Record<string, string | null>;
      }];
    };
  };
}

export function generateSchema(schemaNodes: SchemaNodes): Schema {
  const result: Schema = { nodes: {} };
  Object.keys(schemaNodes).forEach(nodeName => {
    result.nodes[nodeName] = {
      ...schemaNodes[nodeName],
      parseDom: [{
        tag: 'jdita-node-' + nodeName,
        getAttrs: (dom: HTMLElement): Record<string, string | null> => schemaNodes[nodeName].attrs
          ? Object.keys(schemaNodes[nodeName]).reduce((attrs, attr) => {
            if (dom.hasAttribute('jdita-attr-' + attr)) {
              attrs[attr] = dom.getAttribute('jdita-attr-' + attr);
            }
            return attrs;
          }, {} as Record<string, string | null>)
          : {},
      }],
      toDom: (node: { attrs: Record<string, string> }): [string, Record<string, string>, 0] => ['jdita-node-' + nodeName, node.attrs
        ? Object.keys(node.attrs).reduce((attrs, attr) => {
          attrs['jdita-attr-' + attr] = node.attrs[attr];
          return attrs;
        }, {} as Record<string, string>)
        : {}, 0]
    }
  });
  return result;
}
