/* eslint-disable @typescript-eslint/no-explicit-any */

import { CDATA, isCDATA, isOrUndefined } from "../utils";

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
  