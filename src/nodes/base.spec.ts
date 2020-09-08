import { assert, expect } from 'chai';
import { BaseNode } from './base';
import { stringsToChildTypes } from '../utils';


describe('Base Node children (nodes)', () => {
  class ChildNode extends BaseNode {
    static nodeName = 'child';
  }
  describe('Cardinality', () => {
    it('[0..1] should accept only one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringsToChildTypes(['child?']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw();
    });
    it('[1..1] should accept only one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringsToChildTypes(['child']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw();
    });
    it('[0..n] should accept more than one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringsToChildTypes(['child*']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
        parentNode.add(new ChildNode());
      }).to.not.throw();
    });
    it('[1..n] should accept more than one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringsToChildTypes(['child+']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
        parentNode.add(new ChildNode());
      }).to.not.throw();
    });
  });
  describe('Order', () => {
    it('[0..1] should skip first child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringsToChildTypes(['first?', 'child']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
    });
    it('[1..1] should not skip first child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringsToChildTypes(['first', 'child']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw();
    });
    it('[0..n] should skip first child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringsToChildTypes(['first*', 'child']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
    });
    it('[1..n] should not skip first child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringsToChildTypes(['first+', 'child']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw();
    });
  });
});

describe('Base Node children (groups)', () => {
  class ChildNode extends BaseNode {
    static nodeName = 'text';
  }
  describe('Cardinality', () => {
    it('[0..1] should accept only one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringsToChildTypes(['%all-inline?']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw();
    });
    it('[1..1] should accept only one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringsToChildTypes(['%all-inline']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw();
    });
    it('[0..n] should accept more than one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringsToChildTypes(['%all-inline*']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
        parentNode.add(new ChildNode());
      }).to.not.throw();
    });
    it('[1..n] should accept more than one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringsToChildTypes(['%all-inline+']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
        parentNode.add(new ChildNode());
      }).to.not.throw();
    });
  });
  describe('Order', () => {
    it('[0..1] should skip first child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringsToChildTypes(['first?', '%all-inline']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
    });
    it('[1..1] should not skip first child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringsToChildTypes(['first', '%all-inline']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw();
    });
    it('[0..n] should skip first child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringsToChildTypes(['first*', '%all-inline']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
    });
    it('[1..n] should not skip first child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringsToChildTypes(['first+', '%all-inline']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw();
    });
  });
});