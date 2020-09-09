import { expect, assert } from 'chai';
import { ChildType, stringToChildTypes, splitTypenames } from './utils';

describe('Childtype from string', () => {
  it('[0..1] should return the correct ChildType', () => {
    assert.deepEqual({
      name: 'child',
      single: true,
      required: false,
      isGroup: false,
    } as ChildType, stringToChildTypes('child?'));
  });
  it('[1..1] should return the correct ChildType', () => {
    assert.deepEqual({
      name: 'child',
      single: true,
      required: true,
      isGroup: false,
    } as ChildType, stringToChildTypes('child'));
  });
  it('[0..n] should return the correct ChildType', () => {
    assert.deepEqual({
      name: 'child',
      single: false,
      required: false,
      isGroup: false,
    } as ChildType, stringToChildTypes('child*'));
  });
  it('[1..n] should return the correct ChildType', () => {
    assert.deepEqual({
      name: 'child',
      single: false,
      required: true,
      isGroup: false,
    } as ChildType, stringToChildTypes('child+'));
  });
  it('[0..1] should return the correct ChildType (group)', () => {
    assert.deepEqual({
      name: 'child',
      single: true,
      required: false,
      isGroup: true,
    } as ChildType, stringToChildTypes('%child?'));
  });
  it('[1..1] should return the correct ChildType (group)', () => {
    assert.deepEqual({
      name: 'child',
      single: true,
      required: true,
      isGroup: true,
    } as ChildType, stringToChildTypes('%child'));
  });
  it('[0..n] should return the correct ChildType (group)', () => {
    assert.deepEqual({
      name: 'child',
      single: false,
      required: false,
      isGroup: true,
    } as ChildType, stringToChildTypes('%child*'));
  });
  it('[1..n] should return the correct ChildType (group)', () => {
    assert.deepEqual({
      name: 'child',
      single: false,
      required: true,
      isGroup: true,
    } as ChildType, stringToChildTypes('%child+'));
  });
});
describe('Childtypes from strings', () => {
  it('should split types names correctly', () => {
    assert.deepEqual(splitTypenames('child1?|child2+'), ['child1?', 'child2+']);
  });
  it('should split types names correctly (using parentheses)', () => {
    assert.deepEqual(splitTypenames('(child1|child2)+'), ['child1+', 'child2+']);
  });
  it('should return the correct ChildTypes', () => {
    assert.deepEqual(stringToChildTypes(['child1?', 'child2+']), [stringToChildTypes('child1?'), stringToChildTypes('child2+')]);
  });
  it('should return the ChildTypes with any order', () => {
    assert.deepEqual(stringToChildTypes([['child1?', 'child2+']]), [[stringToChildTypes('child1?'), stringToChildTypes('child2+')]]);
  });
  it('should return the ChildTypes with any order', () => {
    assert.deepEqual(stringToChildTypes(['child1?|child2+']), [[stringToChildTypes('child1?'), stringToChildTypes('child2+')]]);
  });
});