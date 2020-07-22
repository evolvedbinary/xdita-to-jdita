import { CDATA, isOrUndefined, isCDATA } from "../utils";

export const ClassFields = ['outputClass', 'className'];
export interface ClassAttributes {
  'outputClass'?: CDATA;
  'className'?: CDATA;
}
export const isClassAttributes = (value?: any): value is ClassAttributes =>
  typeof value === 'object' &&
  isOrUndefined(isCDATA, value['outputClass']) &&
  isOrUndefined(isCDATA, value['className']);