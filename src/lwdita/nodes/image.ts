import { FiltersNode, isFiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { LocalizationNode, isLocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { VariableContentNode, isVariableContentNode, VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { ReferenceContentNode, isReferenceContentNode, ReferenceContentFields, makeReferenceContent } from "./reference-content";
import { NMTOKEN, isOrUndefined, isNMTOKEN, areFieldsValid, Attributes } from "../utils";
import { ClassNode, isClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { BaseNode, makeComponent, makeAll } from "./base";

export const ImageFields = [...FiltersFields, ...LocalizationFields, ...VariableContentFields, ...ReferenceContentFields, ...ClassFields];
export interface ImageNode extends FiltersNode, LocalizationNode, VariableContentNode, ReferenceContentNode, ClassNode {
  'height'?: NMTOKEN;
  'width'?: NMTOKEN;
}
export const isImageNodes = (value?: any): value is ImageNode =>
  value &&
  isOrUndefined(isNMTOKEN, value['height']) &&
  isOrUndefined(isNMTOKEN, value['width']) &&
  isClassNode(value) &&
  isFiltersNode(value) &&
  isLocalizationNode(value) &&
  isReferenceContentNode(value) &&
  isVariableContentNode(value);

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
export const isImageNode = (value?: any): value is ImageNode =>
  typeof value === 'object' && areFieldsValid(ImageFields, value, isValidImageField);

export function makeImage<T extends { new(...args: any[]): BaseNode }>(constructor: T): T  {
  // TODO: add properties
  return makeAll(class extends constructor {
    get 'height'(): NMTOKEN | undefined {
      return this.readProp<NMTOKEN | undefined>('height'); }
    set 'height'(value: NMTOKEN | undefined) {
        this.writeProp<NMTOKEN | undefined>('height', value); }
    get 'width'(): NMTOKEN | undefined {
      return this.readProp<NMTOKEN | undefined>('width'); }
    set 'width'(value: NMTOKEN | undefined) {
        this.writeProp<NMTOKEN | undefined>('width', value); }
  }, makeLocalization, makeFilters, makeVariableContent, makeClass, makeReferenceContent);
}

@makeComponent(makeImage, 'image', isValidImageField, ImageFields, ['alt'])
export class ImageNode extends BaseNode {
  constructor(attributes?: Attributes) {
      super();
      this._props = this.attributesToProps(attributes);
  }
}
