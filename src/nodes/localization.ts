import { isOrUndefined, areFieldsValid } from "../utils";
import { BaseNode } from "./base";
import { BasicValue, isCDATA, CDATA } from "../classes";

export const LocalizationFields = ['dir', 'xml:lang', 'translate'];
export interface LocalizationNode {
  'dir'?: CDATA;
  'xml:lang'?: CDATA;
  'translate'?: CDATA;
}

export function isValidLocalizationField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'dir': return isOrUndefined(isCDATA, value);
    case 'xml:lang': return isOrUndefined(isCDATA, value);
    case 'translate': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}

export const isLocalizationNode = (value?: {}): value is LocalizationNode =>
  typeof value === 'object' && areFieldsValid(LocalizationFields, value, isValidLocalizationField);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeLocalization<T extends { new(...args: any[]): BaseNode }>(constructor: T): T {
  return class extends constructor implements LocalizationNode {
    get 'dir'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('dir');
    }
    set 'dir'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('dir', value);
    }
    get 'xml:lang'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('xml:lang');
    }
    set 'xml:lang'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('xml:lang', value);
    }
    get 'translate'(): CDATA | undefined {
      return this.readProp<CDATA | undefined>('translate');
    }
    set 'translate'(value: CDATA | undefined) {
      this.writeProp<CDATA | undefined>('translate', value);
    }
  }
}
