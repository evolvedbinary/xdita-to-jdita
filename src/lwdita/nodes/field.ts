import { CDATA, isOrUndefined, isCDATA, areFieldsValid } from "../utils";
import { BaseNode } from "./base";

export const FieldFields = ['name', 'value'];
export interface FieldNode<T = CDATA> {
  'name'?:CDATA;
  'value'?: T;
}

export const isValidFieldField = (validator: (val: any) => boolean = isCDATA): (field: string, value: any) => boolean =>
  (field: string, value: any): boolean => {
    switch(field) {
      case 'name': return isOrUndefined(isCDATA, value);
      case 'value': return isOrUndefined(validator, value);
      default: return false;
    }
  }

export const isFieldNode = (value?: any): value is FieldNode =>
  typeof value === 'object' && areFieldsValid(FieldFields, value, isValidFieldField());

export function makeField<ValueType, T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  return class extends constructor implements FieldNode<ValueType> {
    get 'name'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('name'); }
    set 'name'(value: CDATA | undefined) {
        this.writeProp<CDATA | undefined>('name', value); }
    get 'value'(): ValueType | undefined {
      return this.readProp<ValueType | undefined>('value'); }
    set 'value'(value: ValueType | undefined) {
        this.writeProp<ValueType | undefined>('value', value); }
  }
}

export type BooleanFieldNode = FieldNode<boolean>;
export const isValidBooleanFieldField = isValidFieldField(val => typeof val === 'boolean');

export const makeBooleanField = <T extends { new(...args: any[]): BaseNode }>(constructor: T): T =>
  makeField<boolean, T>(constructor);
