import { CDATA, isOrUndefined, isCDATA, areFieldsValid } from "../utils";
import { FiltersAddsAttributes, FiltersAddsFields } from "./filters-adds";

export const FiltersFields = [...FiltersAddsFields, 'props'];
export interface FiltersAttributes extends FiltersAddsAttributes {
  'props'?: CDATA;
}

export function isValidFiltersField(field: string, value: any): boolean {
  switch(field) {
    case 'props': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}
  
export const isFiltersAttributes = (value?: any): value is FiltersAttributes =>
  typeof value === 'object' && areFieldsValid(FiltersFields, value, isValidFiltersField);
