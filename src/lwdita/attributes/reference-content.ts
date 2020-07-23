import { CDATA, ReferenceContentScope, isCDATA, isOrUndefined, isReferenceContentScope, areFieldsValid } from "../utils";

export const ReferenceContentFields = ['href', 'format', 'scope'];
export interface ReferenceContentAttributes {
  'href'?: CDATA;
  'format'?: CDATA;
  'scope'?: ReferenceContentScope;
}

export function isValidReferenceContentField(field: string, value: any): boolean {
  switch(field) {
    case 'href': return isOrUndefined(isCDATA, value);
    case 'format': return isOrUndefined(isCDATA, value);
    case 'scope': return isOrUndefined(isReferenceContentScope, value);
    default: return false;
  }
}
    
export const isReferenceContentAttributes = (value?: any): value is ReferenceContentAttributes =>
  typeof value === 'object' && areFieldsValid(ReferenceContentFields, value, isValidReferenceContentField);
