import { assert, expect } from 'chai';
import { BaseNode, Constructor } from './nodes';

export function doNodeTest(
  classType: typeof BaseNode,
  nodeName: string,
  nodeType: string,
  domNodeName: string,
  validator: (value?: {}) => boolean,
  fields: string[],
  children: string[],
  groups: string[]): void {
  describe('Node: ' + nodeName, () => {
    it('should have correct fields', () => {
      assert.sameMembers(classType.fields, fields);
    });
    it('should have correct node name', () => {
      assert.equal(classType.nodeName, nodeName);
    });
    it('should have correct node type', () => {
      assert.equal(classType.nodeType, nodeType);
    });
    it('should have correct node name', () => {
      assert.equal(classType.domNodeName, domNodeName);
    });
    it('should be a correct node', () => {
      const node = new (classType as unknown as Constructor)({});
      expect(validator(node)).to.be.true;
    });
    it('should be accept correct children', () => {
      assert.sameMembers(children, classType.childTypes);
      assert.sameMembers(groups, classType.childGroups);
    });
  });
}