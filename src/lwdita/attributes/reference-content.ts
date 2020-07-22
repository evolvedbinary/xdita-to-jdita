import { CDATA, RefrenceContentScope, isCDATA, isOrUndefined, isReferenceContentScope } from "../utils";

export const ReferenceContentFields = ['href', 'format', 'scope'];
export interface ReferenceContentAttributes {
  'href'?: CDATA;
  'format'?: CDATA;
  'scope'?: RefrenceContentScope;
}
export const isReferenceContentAttributes = (value?: any): value is ReferenceContentAttributes =>
  isOrUndefined(isCDATA, value['href']) &&
  isOrUndefined(isCDATA, value['format']) &&
  isOrUndefined(isReferenceContentScope, value['scope']);
