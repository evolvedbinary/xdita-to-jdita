import { CDATA, isCDATA, isOrUndefined, areFieldsValid } from "../utils";

export const LocalizationFields = ['dir', 'xml:lang', 'translate'];
export interface LocalizationAttributes {
  'dir'?: CDATA;
  'xml:lang'?: CDATA;
  'translate'?: CDATA;
}

export function isValidLocalizationField(field: string, value: any): boolean {
  switch(field) {
    case 'dir': return isOrUndefined(isCDATA, value);
    case 'xml:lang': return isOrUndefined(isCDATA, value);
    case 'translate': return isOrUndefined(isCDATA, value);
    default: return false;
  }
}
  
export const isLocalizationAttributes = (value?: any): value is LocalizationAttributes =>
  typeof value === 'object' && areFieldsValid(LocalizationFields, value, isValidLocalizationField);
