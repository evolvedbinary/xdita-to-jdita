import { isOrUndefined, areFieldsValid } from "../utils";
import { BaseNode } from "./base";
import { CDATA, BasicValue, isCDATA } from "../classes";

export const ClassFields = ['outputclass', 'class'];
export interface ClassNode {
  'outputclass'?: CDATA;
  'class'?: CDATA;
}

export function isValidClassField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'outputclass': return isOrUndefined(isCDATA, value);
    case 'class': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

export const isClassNode = (value?: {}): value is ClassNode =>
  typeof value === 'object' && areFieldsValid(ClassFields, value, isValidClassField);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeClass<T extends { new(...args: any[]): BaseNode }>(constructor: T): T {
  return class extends constructor implements ClassNode {
    get 'outputclass'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('outputclass');
    }
    set 'outputclass'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('outputclass', value);
    }
    get 'class'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('class');
    }
    set 'class'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('class', value);
    }
  }
}
