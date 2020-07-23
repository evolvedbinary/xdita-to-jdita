import { CDATA, isOrUndefined, isCDATA, areFieldsValid, BasicValue } from "../utils";
import { FiltersAddsNode, FiltersAddsFields } from "./filters-adds";
import { BaseNode } from "./base";

export const FiltersFields = [...FiltersAddsFields, 'props'];
export interface FiltersNode extends FiltersAddsNode {
  'props'?: CDATA;
}

export function isValidFiltersField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'props': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

export const isFiltersNode = (value?: {}): value is FiltersNode =>
  typeof value === 'object' && areFieldsValid(FiltersFields, value, isValidFiltersField);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeFilters<T extends { new(...args: any[]): BaseNode }>(constructor: T): T {
  return class extends constructor implements FiltersNode {
    get 'props'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('props');
    }
    set 'props'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('props', value);
    }
  }
}
