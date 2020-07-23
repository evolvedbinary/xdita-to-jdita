import { CDATA, isOrUndefined, isCDATA, areFieldsValid } from "../utils";
import { BaseNode } from "./base";

export const ClassFields = ['outputClass', 'className'];
export interface ClassNode {
  'outputClass'?: CDATA;
  'className'?: CDATA;
}

export function isValidClassField(field: string, value: any): boolean {
  switch(field) {
    case 'outputClass': return isOrUndefined(isCDATA, value);
    case 'className': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

export const isClassNode = (value?: any): value is ClassNode =>
  typeof value === 'object' && areFieldsValid(ClassFields, value, isValidClassField);

export function makeClass<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return class extends constructor implements ClassNode {
    get 'outputClass'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('outputClass'); }
    set 'outputClass'(value: CDATA | undefined) {
        this.writeProp<CDATA | undefined>('outputClass', value); }
    get 'className'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('className'); }
    set 'className'(value: CDATA | undefined) {
        this.writeProp<CDATA | undefined>('className', value); }
  }
}
