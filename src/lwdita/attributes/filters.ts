/* eslint-disable @typescript-eslint/no-explicit-any */

import { CDATA, isOrUndefined, isCDATA } from "../utils";

export interface FiltersAttributes {
  props?: CDATA;
}
export const isFiltersAttributes = (value?: any): value is FiltersAttributes =>
  typeof value === 'object' &&
  isOrUndefined(isCDATA, value['props']);
