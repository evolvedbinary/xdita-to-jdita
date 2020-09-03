import { ClassNode, ClassFields, isValidClassField, makeClass } from "./class";
import { ReuseNode, ReuseFields, isValidReuseField, makeReuse } from "./reuse";
import { LocalizationNode, LocalizationFields, isValidLocalizationField, makeLocalization } from "./localization";
import { FiltersNode, FiltersFields, isValidFiltersField, makeFilters } from "./filters";
import { areFieldsValid, isCDATA, CDATA, BasicValue } from "../utils";
import { makeComponent, BaseNode, makeAll } from "./base";

export const NoteFields = [...FiltersFields, ...LocalizationFields, ...ReuseFields, ...ClassFields];
export interface NoteNode extends FiltersNode, LocalizationNode, ReuseNode, ClassNode {
  type: CDATA;
}

export function isValidNoteField(field: string, value: BasicValue): boolean {
  if (isValidFiltersField(field, value) || isValidLocalizationField(field, value) || isValidReuseField(field, value) || isValidClassField(field, value)) {
    return true;
  }
  switch (field) {
    case 'type': return isCDATA(value);
    default: return false;
  }
}

export const isNoteNode = (value?: {}): value is NoteNode =>
  typeof value === 'object' && areFieldsValid(NoteFields, value, isValidNoteField);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeNote<T extends { new(...args: any[]): BaseNode }>(constructor: T): T {
  return makeAll(class extends constructor {
    get 'type'(): CDATA {
      return this.readProp<CDATA>('type');
    }
    set 'type'(value: CDATA) {
      this.writeProp<CDATA>('type', value);
    }
  }, makeLocalization, makeFilters, makeReuse, makeClass);
}

@makeComponent(makeNote, 'note', isValidNoteField, NoteFields, ['li'])
export class NoteNode extends BaseNode {
  static domNodeName = 'div';
}
