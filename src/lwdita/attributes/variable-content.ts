import { CDATA, isOrUndefined, isCDATA, areFieldsValid } from "../utils";

export const VariableContentFields = ['keyref'];
export interface VariableContentAttributes {
  'keyref'?: CDATA;
}

export function isValidVariableContentField(field: string, value: any): boolean {
  switch(field) {
    case 'keyref': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}
  
export const isVariableContentAttributes = (value?: any): value is VariableContentAttributes =>
  typeof value === 'object' && areFieldsValid(VariableContentFields, value, isValidVariableContentField);
  