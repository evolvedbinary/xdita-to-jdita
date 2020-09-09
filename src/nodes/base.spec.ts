import { expect } from 'chai';
import { BaseNode } from './base';
import { stringToChildTypes } from '../utils';


describe('Base Node children (nodes)', () => {
  class ChildNode extends BaseNode {
    static nodeName = 'child';
  }
  class Child2Node extends BaseNode {
    static nodeName = 'child2';
  }
  describe('Any order', () => {
    it('[0..1] should accept only one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['(child|child2)?']);
      }
      // child twice
      let parentNode: ParentNode;
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw();
      // child2 twice
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.throw();
      // child then child2
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.throw();
      // child2 then child
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw();
    });
    it('[1..1] should accept only one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['child|child2']);
      }
      // child twice
      let parentNode: ParentNode;
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw();
      // child2 twice
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.throw();
      // child then child2
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.throw();
      // child2 then child
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw();
    });
    it('[0..n] should accept many children', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['(child|child2)+']);
      }
      // child twice
      let parentNode: ParentNode;
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
        parentNode.add(new ChildNode());
      }).to.not.throw();
      // child2 twice
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
        parentNode.add(new Child2Node());
      }).to.not.throw();
      // child then child2
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
        parentNode.add(new Child2Node());
      }).to.not.throw();
      // child2 then child
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
        parentNode.add(new ChildNode());
      }).to.not.throw();
    });
    it('[1..n] should accept many children', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['(child|child2)*']);
      }
      // child twice
      let parentNode: ParentNode;
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
        parentNode.add(new ChildNode());
      }).to.not.throw();
      // child2 twice
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
        parentNode.add(new Child2Node());
      }).to.not.throw();
      // child then child2
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
        parentNode.add(new Child2Node());
      }).to.not.throw();
      // child2 then child
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
        parentNode.add(new ChildNode());
      }).to.not.throw();
    });
  });
  describe('Cardinality', () => {
    it('[0..1] should accept only one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['child?']);
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
        static childTypes = stringToChildTypes(['child']);
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
        static childTypes = stringToChildTypes(['child*']);
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
        static childTypes = stringToChildTypes(['child+']);
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
        static childTypes = stringToChildTypes(['first?', 'child']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
    });
    it('[1..1] should not skip first child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['first', 'child']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw();
    });
    it('[0..n] should skip first child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['first*', 'child']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
    });
    it('[1..n] should not skip first child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['first+', 'child']);
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
        static childTypes = stringToChildTypes(['%all-inline?']);
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
        static childTypes = stringToChildTypes(['%all-inline']);
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
        static childTypes = stringToChildTypes(['%all-inline*']);
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
        static childTypes = stringToChildTypes(['%all-inline+']);
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
        static childTypes = stringToChildTypes(['first?', '%all-inline']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
    });
    it('[1..1] should not skip first child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['first', '%all-inline']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw();
    });
    it('[0..n] should skip first child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['first*', '%all-inline']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
    });
    it('[1..n] should not skip first child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['first+', '%all-inline']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw();
    });
  });
});