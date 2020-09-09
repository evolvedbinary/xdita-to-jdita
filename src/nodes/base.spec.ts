import { expect } from 'chai';
import { BaseNode } from './base';
import { stringToChildTypes } from '../utils';
import { NonAcceptedChildError } from '../classes';


describe('Base Node children (nodes)', () => {
  class ChildNode extends BaseNode {
    static nodeName = 'child';
  }
  class Child2Node extends BaseNode {
    static nodeName = 'child2';
  }
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
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
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
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
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
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
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
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
  });
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
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child2 twice
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child then child2
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child2 then child
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
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
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child2 twice
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child then child2
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child2 then child
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new Child2Node());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
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
});

describe('Base Node children (groups)', () => {
  class ChildInlineNode extends BaseNode {
    static nodeName = 'text';
  }
  class ChildBlockNode extends BaseNode {
    static nodeName = 'video';
  }
  describe('Cardinality', () => {
    it('[0..1] should accept only one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['%all-inline?']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
    it('[1..1] should accept only one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['%all-inline']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
    it('[0..n] should accept more than one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['%all-inline*']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
    });
    it('[1..n] should accept more than one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['%all-inline+']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
        parentNode.add(new ChildInlineNode());
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
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
    });
    it('[1..1] should not skip first child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['first', '%all-inline']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
    it('[0..n] should skip first child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['first*', '%all-inline']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
    });
    it('[1..n] should not skip first child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['first+', '%all-inline']);
      }
      const parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
  });
  describe('Any order', () => {
    it('[0..1] should accept only one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['(%all-inline|%all-blocks)?']);
      }
      // child twice
      let parentNode: ParentNode;
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child2 twice
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildBlockNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildBlockNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child then child2
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildBlockNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child2 then child
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildBlockNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
    it('[1..1] should accept only one child', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['%all-inline|%all-blocks']);
      }
      // child twice
      let parentNode: ParentNode;
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child2 twice
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildBlockNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildBlockNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child then child2
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildBlockNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
      // child2 then child
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildBlockNode());
      }).to.not.throw();
      expect(() => {
        parentNode.add(new ChildInlineNode());
      }).to.throw(NonAcceptedChildError, 'can\'t be a child');
    });
    it('[0..n] should accept many children', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['(%all-inline|%all-blocks)+']);
      }
      // child twice
      let parentNode: ParentNode;
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
      // child2 twice
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildBlockNode());
        parentNode.add(new ChildBlockNode());
      }).to.not.throw();
      // child then child2
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
        parentNode.add(new ChildBlockNode());
      }).to.not.throw();
      // child2 then child
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildBlockNode());
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
    });
    it('[1..n] should accept many children', () => {
      class ParentNode extends BaseNode {
        static nodeName = 'parent';
        static childTypes = stringToChildTypes(['(%all-inline|%all-blocks)*']);
      }
      // child twice
      let parentNode: ParentNode;
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
      // child2 twice
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildBlockNode());
        parentNode.add(new ChildBlockNode());
      }).to.not.throw();
      // child then child2
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildInlineNode());
        parentNode.add(new ChildBlockNode());
      }).to.not.throw();
      // child2 then child
      parentNode = new ParentNode();
      expect(() => {
        parentNode.add(new ChildBlockNode());
        parentNode.add(new ChildInlineNode());
      }).to.not.throw();
    });
  });
});