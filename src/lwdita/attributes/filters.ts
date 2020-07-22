import { CDATA, isOrUndefined, isCDATA } from "../utils";
import { FiltersAddsAttributes, FiltersAddsFields } from "./filters-adds";

export const FiltersFields = [...FiltersAddsFields, 'props'];
export interface FiltersAttributes extends FiltersAddsAttributes {
  'props'?: CDATA;
}
export const isFiltersAttributes = (value?: any): value is FiltersAttributes =>
  typeof value === 'object' &&
  isOrUndefined(isCDATA, value['props']);
