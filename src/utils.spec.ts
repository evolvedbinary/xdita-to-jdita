import { expect, assert } from 'chai';
import { stringToChildTypes, splitTypenames, childTypesToString } from './utils';
import { ChildType } from './classes';

describe('Childtype from string', () => {
  it('should return an empty ChildType', () => {
    assert.deepEqual([], stringToChildTypes(''));
  });
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
describe('String from Childtype', () => {
  it('[0..1] should return the correct string', () => {
    assert.equal(childTypesToString({
      name: 'child',
      single: true,
      required: false,
      isGroup: false,
    }), 'child?');
  });
  it('[1..1] should return the correct string', () => {
    assert.equal(childTypesToString({
      name: 'child',
      single: true,
      required: true,
      isGroup: false,
    }), 'child');
  });
  it('[0..n] should return the correct string', () => {
    assert.equal(childTypesToString({
      name: 'child',
      single: false,
      required: false,
      isGroup: false,
    }), 'child*');
  });
  it('[1..n] should return the correct string', () => {
    assert.equal(childTypesToString({
      name: 'child',
      single: false,
      required: true,
      isGroup: false,
    }), 'child+');
  });
  it('[0..1] should return the correct string (group with one node)', () => {
    assert.equal(childTypesToString({
      name: 'data',
      single: true,
      required: false,
      isGroup: true,
    }), 'data?');
  });
  it('[1..1] should return the correct string (group with one node)', () => {
    assert.equal(childTypesToString({
      name: 'data',
      single: true,
      required: true,
      isGroup: true,
    }), 'data');
  });
  it('[0..n] should return the correct string (group with one node)', () => {
    assert.equal(childTypesToString({
      name: 'data',
      single: false,
      required: false,
      isGroup: true,
    }), 'data*');
  });
  it('[1..n] should return the correct string (group with one node)', () => {
    assert.equal(childTypesToString({
      name: 'data',
      single: false,
      required: true,
      isGroup: true,
    }), 'data+');
  });
  it('[0..1] should return the correct string (group with multiple nodes)', () => {
    assert.equal(childTypesToString(stringToChildTypes('(ph|b|i|u|sub|sup)?')), 'ph?|b?|i?|u?|sub?|sup?');
  });
  it('[1..1] should return the correct string (group with multiple nodes)', () => {
    assert.equal(childTypesToString(stringToChildTypes('ph|b|i|u|sub|sup')), 'ph|b|i|u|sub|sup');
  });
  it('[0..n] should return the correct string (group with multiple nodes)', () => {
    assert.equal(childTypesToString(stringToChildTypes('(ph|b|i|u|sub|sup)*')), 'ph*|b*|i*|u*|sub*|sup*');
  });
  it('[1..n] should return the correct string (group with multiple nodes)', () => {
    assert.equal(childTypesToString(stringToChildTypes('(ph|b|i|u|sub|sup)+')), 'ph+|b+|i+|u+|sub+|sup+');
  });
  it('should return the correct string (mixed)', () => {
    assert.equal(childTypesToString(stringToChildTypes(['(ph|b|i|u|sub|sup)?', 'child+', 'a*|b'])), '(ph?|b?|i?|u?|sub?|sup?)|child+|(a*|b)');
  });
  it('should return the correct string (empty)', () => {
    assert.equal(childTypesToString(stringToChildTypes('')), '');
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