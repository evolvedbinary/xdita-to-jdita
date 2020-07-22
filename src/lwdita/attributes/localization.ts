import { CDATA, isCDATA, isOrUndefined } from "../utils";

export const LocalizationFields = ['dir', 'xml:lang', 'translate'];
export interface LocalizationAttributes {
  'dir'?: CDATA;
  'xml:lang'?: CDATA;
  'translate'?: CDATA;
}
export const isLocalizationAttributes = (value?: any): value is LocalizationAttributes =>
  typeof value === 'object' &&
  isOrUndefined(isCDATA, value['dir']) &&
  isOrUndefined(isCDATA, value['xml:lang']) &&
  isOrUndefined(isCDATA, value['translate']);
  