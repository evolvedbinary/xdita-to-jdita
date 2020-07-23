import { FiltersAttributes, FiltersFields, isValidFiltersField } from "./filters";
import { ClassAttributes, ClassFields, isValidClassField } from "./class";
import { ReuseAttributes, ReuseFields, isValidReuseField } from "./reuse";
import { LocalizationAttributes, LocalizationFields, isValidLocalizationField } from "./localization";
import { areFieldsValid } from "../utils";

export const DlFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];
export interface DlAttributes extends FiltersAttributes, LocalizationAttributes, ReuseAttributes, ClassAttributes {}
export const isValidDlField = (field: string, value: any): boolean => isValidFiltersField(field, value)
  || isValidLocalizationField(field, value)
  || isValidReuseField(field, value)
  || isValidClassField(field, value);
export const isDlAttributes = (value?: any): value is DlAttributes =>
  typeof value === 'object' && areFieldsValid(DlFields, value, isValidDlField);