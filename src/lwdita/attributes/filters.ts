import { CDATA, isOrUndefined, isCDATA } from "../utils";
import { FiltersAddsAttributes } from "./filters-adds";

export interface FiltersAttributes extends FiltersAddsAttributes {
  props?: CDATA;
}
export const isFiltersAttributes = (value?: any): value is FiltersAttributes =>
  typeof value === 'object' &&
  isOrUndefined(isCDATA, value['props']);
