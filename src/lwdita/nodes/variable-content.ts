import { CDATA, isOrUndefined, isCDATA, areFieldsValid, BasicValue } from "../utils";
import { BaseNode } from "./base";

export const VariableContentFields = ['keyref'];

export interface VariableContentNode {
  'keyref'?: CDATA;
}

export function isValidVariableContentField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'keyref': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

export const isVariableContentNode = (value?: {}): value is VariableContentNode =>
  typeof value === 'object' && areFieldsValid(VariableContentFields, value, isValidVariableContentField);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeVariableContent<T extends { new(...args: any[]): BaseNode }>(constructor: T): T {
  return class extends constructor implements VariableContentNode {
    get 'keyref'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('keyref');
    }
    set 'keyref'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('keyref', value);
    }
  }
}
