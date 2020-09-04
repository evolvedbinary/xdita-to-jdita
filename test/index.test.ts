import { assert, expect } from 'chai';
import { AltNode, AltFields, isAltNode } from '../src';

describe('AltNode', () => {
  it('should have correct fields', () => {
    assert.equal(AltNode.fields, AltFields);
  });
  it('should have correct node name', () => {
    assert.equal(AltNode.nodeName, 'alt');
  });
  it('should have correct node type', () => {
    assert.equal(AltNode.nodeType, 'alt');
  });
  it('should have correct node name', () => {
    assert.equal(AltNode.domNodeName, '');
  });
  it('should be a correct node', () => {
    const alt = new AltNode({});
    expect(isAltNode(alt)).to.be.true;
  });
});