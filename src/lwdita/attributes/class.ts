import { CDATA, isOrUndefined, isCDATA, areFieldsValid } from "../utils";

export const ClassFields = ['outputClass', 'className'];
export interface ClassAttributes {
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

export const isClassAttributes = (value?: any): value is ClassAttributes =>
  typeof value === 'object' && areFieldsValid(ClassFields, value, isValidClassField);
