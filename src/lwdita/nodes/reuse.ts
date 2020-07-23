import { NMTOKEN, CDATA, isOrUndefined, isCDATA, isNMTOKEN, areFieldsValid, BasicValue } from "../utils";
import { BaseNode } from "./base";

export const ReuseFields = ['id', 'conref'];
export interface ReuseNode {
  'id'?: NMTOKEN;
  'conref'?: CDATA;
}

export function isValidReuseField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'id': return isOrUndefined(isNMTOKEN, value);
    case 'conref': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

export const isReuseNode = (value?: {}): value is ReuseNode =>
  typeof value === 'object' && areFieldsValid(ReuseFields, value, isValidReuseField);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeReuse<T extends { new(...args: any[]): BaseNode }>(constructor: T): T {
  return class extends constructor implements ReuseNode {
    get 'id'(): NMTOKEN | undefined {
      return this.readProp<NMTOKEN | undefined>('id');
    }
    set 'id'(value: NMTOKEN | undefined) {
      this.writeProp<NMTOKEN | undefined>('id', value);
    }
    get 'conref'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('conref');
    }
    set 'conref'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('conref', value);
    }
  }
}
