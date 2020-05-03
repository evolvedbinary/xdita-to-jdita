export namespace HList {

    // TODO(AR) move exports into a .d.ts file?

    export interface HList {
        readonly isNil: Boolean
        size() : Number
        prepend<H, T extends HList>(head: H) : HNeList<H, T>            // TODO(AR) is this correct? should we just remove it?
    }

    export interface HNil extends HList {
        readonly isNil: true
        size() : 0
        prepend<H>(head: H) : HNeList<H, HNil>;
    }
    export class HNil {
        readonly isNil = true

        size(): 0 {
            return 0
        }

        prepend<H>(head: H) : HNeList<H, HNil> {
            return new HNeList<H, HNil>(head, nil)
        }
    }
    export const nil: HNil = new HNil();
    
    export interface HNeList<H, T extends HList> {
        readonly isNil: false
        head: H
        tail: T
        prepend<HH>(head: HH) : HNeList<HH, HNeList<H, T>>
    }
    export class HNeList<H, T extends HList> {
        readonly isNil = false

        constructor(head: H, tail: T) {
            this.head = head
            this.tail = tail
        }

        size(): Number {
            let hlist: HList = this
            let size = 0
            while (!hlist.isNil) {
                size++
                hlist = (hlist as HNeList<any, any>).tail
            }
            return size
        }

        prepend<HH>(head: Exclude<HH, HNil>) : HNeList<HH, HNeList<H, T>> {
            return new HNeList(head, this)
        }

        // TODO(AR) what does this do? is this the append we really want? We should write sokme tests! then... otherwise implement in-terms of a fold e.g. recursive...
        append<I>(item: Exclude<I, HNil>) : HNeList<H, HNeList<I, T>> {
            return new HNeList<H, HNeList<I, T>>(this.head, new HNeList(item, this.tail))
        }
    }

    export function hlist<I>(item: Exclude<I, HNil>) : HNeList<I, HNil> {
        return new HNeList(item, nil)
    }

    export function hlist2<I1, I2>(item1: I1, item2: I2) : HNeList<I1, HNeList<I2, HNil>> {
        return new HNeList(item1, new HNeList(item2, nil))
    }

    export function hlist3<I1, I2, I3>(item1: I1, item2: I2, item3: I3) : HNeList<I1, HNeList<I2, HNeList<I3, HNil>>> {
        return new HNeList(item1, new HNeList(item2, new HNeList(item3, nil)))
    }

    export function hlist4<I1, I2, I3, I4>(item1: I1, item2: I2, item3: I3, item4: I4) : HNeList<I1, HNeList<I2, HNeList<I3, HNeList<I4, HNil>>>> {
        return new HNeList(item1, new HNeList(item2, new HNeList(item3, new HNeList(item4, nil))))
    }

    export function hlist5<I1, I2, I3, I4, I5>(item1: I1, item2: I2, item3: I3, item4: I4, item5: I5) : HNeList<I1, HNeList<I2, HNeList<I3, HNeList<I4, HNeList<I5, HNil>>>>> {
        return new HNeList(item1, new HNeList(item2, new HNeList(item3, new HNeList(item4, new HNeList(item5, nil)))))
    }
}