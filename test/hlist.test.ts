import { expect } from "chai";
import type from "type-detect";
import "mocha";
import { HList } from "../src/hlist";

describe('HList', function() {
  
    describe("HNil#isNil", function() {
        it('should always be false', function() {
            const hlist = new HList.HNil()

            expect(hlist.isNil).is.true
            expect(hlist.isNil).is.true
        })
    })

    describe("HNil#size()", function() {
        it('should always be 0', function() {
            expect(new HList.HNil().size()).is.equal(0)
        })
    })

    describe("HNil#prepend(item)", function() {
        const hlist = new HList.HNil().prepend("item1")

        it('should return an HNeList', function() {
            expect(hlist).is.instanceOf(HList.HNeList)
        })

        it('should have resulting list of size=1', function() {
            expect(hlist.size()).to.equal(1)
        })

        it('should have resulting list with head set to item', function() {
            expect(hlist.head).to.equal("item1")
        })

        it('should have resulting list with tail set to nil', function() {
            expect(hlist.tail).to.equal(HList.nil)
        })
    })

    describe('HNeList#constructor(head, tail)', function() {
        it('should preserve the type of the head element', function() {
            expect(typeof new HList.HNeList("item1", HList.nil).head).to.equal(typeof "String")
            expect(typeof new HList.HNeList(5678, HList.nil).head).to.equal(typeof 1234)
            expect(typeof new HList.HNeList(true, HList.nil).head).to.equal(typeof false)
            expect(typeof new HList.HNeList(new Array<Number>(1,2,3), HList.nil).head).to.equal(typeof new Array<Number>())
        })

        it('should set the head', function() {
            expect(new HList.HNeList("item1", HList.nil).head).to.equal("item1")
        })

        it('should set the tail', function() {
            expect(new HList.HNeList("item1", HList.nil).tail).to.equal(HList.nil)
            expect(new HList.HNeList("item1", new HList.HNeList("item2", HList.nil)).tail).to.eql(new HList.HNeList("item2", HList.nil))
        })
    })

    describe("HNeList#isNil", function() {
        it('should always be false', function() {
            const hlist = new HList.HNeList("item1", HList.nil)
            expect(hlist.isNil).is.false
            expect(hlist.isNil).is.false
        })
    })

    describe("HNeList#size()", function() {
        it('should return 1 on a list of 1 item', function() {
            expect(new HList.HNeList("item1", HList.nil).size()).is.equal(1)
        })

        it('should return 2 on a list of 2 items', function() {
            expect(new HList.HNeList("item1", new HList.HNeList("item2", HList.nil)).size()).is.equal(2)
        })

        it('should return 3 on a list of 3 items', function() {
            expect(new HList.HNeList("item1", new HList.HNeList("item2", new HList.HNeList("item3", HList.nil))).size()).is.equal(3)
        })
    })

    describe("HNeList#prepend(item)", function() {
        const hlist1 = new HList.HNeList("item1", HList.nil)
        const hlist2 = hlist1.prepend("item0")

        it('should return an HNeList', function() {
            expect(hlist2).is.instanceOf(HList.HNeList)
        })

        it('should have resulting list of size=2', function() {
            expect(hlist1.size()).to.equal(1)
            expect(hlist2.size()).to.equal(2)
        })

        it('should have resulting list with head set to item', function() {
            expect(hlist1.head).to.equal("item1")
            expect(hlist2.head).to.equal("item0")
        })

        it('should have resulting list with tail set to previous list', function() {
            expect(hlist1.tail).to.equal(HList.nil)
            expect(hlist2.tail).to.equal(hlist1)
        })
    })

    describe('nil', function() {
        const hlist = HList.nil

        it('should return an HNil', function() {
            expect(hlist).is.instanceOf(HList.HNil)
        })

        it('should always return the same HNil', function() {
            expect(hlist).to.equal(HList.nil)
            expect(hlist).to.not.equal(new HList.HNil)
        })
    })

    describe('#hlist(item)', function() {
        const hlist = HList.hlist("item1")

        it('should return an HNeList', function() {
            expect(hlist).is.instanceOf(HList.HNeList)
        })

        it('should set the item as the head', function() {
            const input = "item1"
            expect(hlist.head).to.equal(input)
        })

        it('should set the tail as HNil', function() {
            const input = "item1"
            expect(hlist.tail).to.equal(HList.nil)
        })

        it('should have resulting list of size=1', function() {
            expect(hlist.size()).to.equal(1)
        })
    })

    describe('#hlist2(item, item)', function() {
        const hlist = HList.hlist2("item1", "item2")

        it('should return an HNeList', function() {
            expect(hlist).is.instanceOf(HList.HNeList)
        })

        it('should contain 2 items', function() {
            expect(hlist.head).to.equal("item1")
            expect(hlist.tail.head).to.equal("item2")
            expect(hlist.tail.tail).to.equal(HList.nil)
        });

        it('should have resulting list of size=2', function() {
            expect(hlist.size()).to.equal(2)
        })
    })

    describe('#hlist3(item, item, item)', function() {
        const hlist = HList.hlist3("item1", "item2", "item3")

        it('should return an HNeList', function() {
            expect(hlist).is.instanceOf(HList.HNeList)
        })

        it('should contain 3 items', function() {
            expect(hlist.head).to.equal("item1")
            expect(hlist.tail.head).to.equal("item2")
            expect(hlist.tail.tail.head).to.equal("item3")
            expect(hlist.tail.tail.tail).to.equal(HList.nil)
        });

        it('should have resulting list of size=3', function() {
            expect(hlist.size()).to.equal(3)
        })
    })

    describe('#hlist4(item, item, item, item)', function() {
        const hlist = HList.hlist4("item1", "item2", "item3", "item4")

        it('should return an HNeList', function() {
            expect(hlist).is.instanceOf(HList.HNeList)
        })

        it('should contain 4 items', function() {
            expect(hlist.head).to.equal("item1")
            expect(hlist.tail.head).to.equal("item2")
            expect(hlist.tail.tail.head).to.equal("item3")
            expect(hlist.tail.tail.tail.head).to.equal("item4")
            expect(hlist.tail.tail.tail.tail).to.equal(HList.nil)
        });

        it('should have resulting list of size=4', function() {
            expect(hlist.size()).to.equal(4)
        })
    })

    describe('#hlist5(item, item, item, item, item)', function() {
        const hlist = HList.hlist5("item1", "item2", "item3", "item4", "item5")

        it('should return an HNeList', function() {
            expect(hlist).is.instanceOf(HList.HNeList)
        })

        it('should contain 5 items', function() {
            expect(hlist.head).to.equal("item1")
            expect(hlist.tail.head).to.equal("item2")
            expect(hlist.tail.tail.head).to.equal("item3")
            expect(hlist.tail.tail.tail.head).to.equal("item4")
            expect(hlist.tail.tail.tail.tail.head).to.equal("item5")
            expect(hlist.tail.tail.tail.tail.tail).to.equal(HList.nil)
        });

        it('should have resulting list of size=5', function() {
            expect(hlist.size()).to.equal(5)
        })
    })
})
