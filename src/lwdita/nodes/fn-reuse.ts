import { CDATA, isOrUndefined, isCDATA, areFieldsValid, BasicValue } from "../utils";
import { BaseNode } from "./base";

export const FnReuseFields = ['conref'];
export interface FnReuseNode {
  'conref'?: CDATA;
}

export function isValidFnReuseField(field: string, value: BasicValue): boolean {
  switch(field) {
    case 'conref': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}
  
export const isFnReuseNode = (value?: {}): value is FnReuseNode =>
  typeof value === 'object' && areFieldsValid(FnReuseFields, value, isValidFnReuseField);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeFnReuse<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return class extends constructor implements FnReuseNode {
    get 'conref'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('conref'); }
    set 'conref'(value: CDATA | undefined) {
        this.writeProp<CDATA | undefined>('conref', value); }
  }
}
