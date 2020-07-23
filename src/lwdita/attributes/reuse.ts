import { NMTOKEN, CDATA, isOrUndefined, isCDATA, isNMTOKEN, areFieldsValid } from "../utils";

export const ReuseFields = ['id', 'conref'];
export interface ReuseAttributes {
  'id'?: NMTOKEN;
  'conref'?: CDATA;
}

export function isValidReuseField(field: string, value: any): boolean {
  switch(field) {
    case 'id': return isOrUndefined(isNMTOKEN, value);
    case 'conref': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}
  
export const isReuseAttributes = (value?: any): value is ReuseAttributes =>
  typeof value === 'object' && areFieldsValid(ReuseFields, value, isValidReuseField);
  