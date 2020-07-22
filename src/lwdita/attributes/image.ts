import { FiltersAttributes, isFiltersAttributes, FiltersFields } from "./filters";
import { LocalizationAttributes, isLocalizationAttributes, LocalizationFields } from "./localization";
import { VariableContentAttributes, isVariableContentAttributes, VariableContentFields } from "./variable-content";
import { ReferenceContentAttributes, isReferenceContentAttributes, ReferenceContentFields } from "./reference-content";
import { NMTOKEN, isOrUndefined, isNMTOKEN } from "../utils";
import { ClassAttributes, isClassAttributes, ClassFields } from "./class";

export const ImageFields = [...FiltersFields, ...LocalizationFields, ...VariableContentFields, ...ReferenceContentFields, ...ClassFields];
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
