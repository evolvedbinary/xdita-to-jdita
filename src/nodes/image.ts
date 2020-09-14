import { FiltersNode, isFiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { LocalizationNode, isLocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { VariableContentNode, isVariableContentNode, VariableContentFields, isValidVariableContentField, makeVariableContent } from "./variable-content";
import { ReferenceContentNode, isReferenceContentNode, ReferenceContentFields, makeReferenceContent, isValidReferenceContentField } from "./reference-content";
import { areFieldsValid } from "../utils";
import { ClassNode, isClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { BaseNode, makeComponent, makeAll, Constructor } from "./base";
import { SizeFields, SizeNode, isSizeNode, isValidSizeField, makeSize } from "./size";
import { AltNode } from "./alt";
import { TextNode } from "./text";
import { BasicValue } from "../classes";

export const ImageFields = [...FiltersFields, ...LocalizationFields, ...VariableContentFields, ...ReferenceContentFields, ...ClassFields, ...SizeFields];

export interface ImageNode extends FiltersNode, LocalizationNode, VariableContentNode, ReferenceContentNode, ClassNode, SizeNode { }

export const isImageNodes = (value?: {}): value is ImageNode =>
  typeof value === 'object' &&
  isClassNode(value) &&
  isFiltersNode(value) &&
  isLocalizationNode(value) &&
  isReferenceContentNode(value) &&
  isVariableContentNode(value) &&
  isSizeNode(value);

export const isValidImageField = (field: string, value: BasicValue): boolean => isValidLocalizationField(field, value)
  || isValidClassField(field, value)
  || isValidReferenceContentField(field, value)
  || isValidFiltersField(field, value)
  || isValidVariableContentField(field, value)
  || isValidSizeField(field, value);
export const isImageNode = (value?: {}): value is ImageNode =>
  typeof value === 'object' && areFieldsValid(ImageFields, value, isValidImageField);

export function makeImage<T extends Constructor>(constructor: T): T {
  // TODO: add properties
  return makeAll(constructor, makeLocalization, makeFilters, makeVariableContent, makeClass, makeReferenceContent, makeSize);
}

@makeComponent(makeImage, 'image', isValidImageField, ImageFields, ['alt?'])
export class ImageNode extends BaseNode {}
