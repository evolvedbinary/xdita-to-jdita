import { FiltersAttributes, isFiltersAttributes, FiltersFields, isValidFiltersField } from "./filters";
import { LocalizationAttributes, isLocalizationAttributes, LocalizationFields, isValidLocalizationField } from "./localization";
import { VariableContentAttributes, isVariableContentAttributes, VariableContentFields, isValidVariableContentField } from "./variable-content";
import { ReferenceContentAttributes, isReferenceContentAttributes, ReferenceContentFields } from "./reference-content";
import { NMTOKEN, isOrUndefined, isNMTOKEN, areFieldsValid } from "../utils";
import { ClassAttributes, isClassAttributes, ClassFields, isValidClassField } from "./class";

export const ImageFields = [...FiltersFields, ...LocalizationFields, ...VariableContentFields, ...ReferenceContentFields, ...ClassFields];
export interface ImageAttributes extends FiltersAttributes, LocalizationAttributes, VariableContentAttributes, ReferenceContentAttributes, ClassAttributes {
  'height'?: NMTOKEN;
  'width'?: NMTOKEN;
}
export const isImageAttributess = (value?: any): value is ImageAttributes =>
  value &&
  isOrUndefined(isNMTOKEN, value['height']) &&
  isOrUndefined(isNMTOKEN, value['width']) &&
  isClassAttributes(value) &&
  isFiltersAttributes(value) &&
  isLocalizationAttributes(value) &&
  isReferenceContentAttributes(value) &&
  isVariableContentAttributes(value);

export function isValidImageField(field: string, value: any): boolean {
  if (isValidLocalizationField(field, value) || isValidClassField(field, value) || isValidFiltersField(field, value) || isValidVariableContentField(field, value)) {
    return true;
  }
  switch(field) {
    case 'height': return isOrUndefined(isNMTOKEN, value);
    case 'width': return isOrUndefined(isNMTOKEN, value);
    default: return false;
  }
}
export const isImageAttributes = (value?: any): value is ImageAttributes =>
  typeof value === 'object' && areFieldsValid(ImageFields, value, isValidImageField);
