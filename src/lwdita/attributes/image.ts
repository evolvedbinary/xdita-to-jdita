import { FiltersAttributes, isFiltersAttributes } from "./filters";
import { LocalizationAttributes, isLocalizationAttributes } from "./localization";
import { VariableContentAttributes, isVariableContentAttributes } from "./variable-content";
import { ReferenceContentAttributes, isReferenceContentAttributes } from "./reference-content";
import { NMTOKEN, isOrUndefined, isNMTOKEN } from "../utils";
import { ClassAttributes, isClassAttributes } from "./class";

export interface ImageAttributes extends FiltersAttributes, LocalizationAttributes, VariableContentAttributes, ReferenceContentAttributes, ClassAttributes {
  'height'?: NMTOKEN;
  'width'?: NMTOKEN;
}
export const isImageAttributes = (value?: any): value is ImageAttributes =>
  value &&
  isOrUndefined(isNMTOKEN, value['height']) &&
  isOrUndefined(isNMTOKEN, value['width']) &&
  isClassAttributes(value) &&
  isFiltersAttributes(value) &&
  isLocalizationAttributes(value) &&
  isReferenceContentAttributes(value) &&
  isVariableContentAttributes(value);
