import { SaxesAttributeNS } from "saxes";

export function has<T>(array: Array<T>, value: T): boolean {
    return array.indexOf(value) >= 0;
}

export type DefinedBasicValue = number | boolean | string | Array<BasicValue> | {} | {
    [key: string]: BasicValue;
    [key: number]: BasicValue;
};

export type BasicValue = undefined | DefinedBasicValue;

export function isOrUndefined<T extends BasicValue>(check: (value?: BasicValue) => boolean, value?: BasicValue): value is T {
    return typeof value === 'undefined' || check(value);
}

// TODO(AR) can we further refine these types?
export type ID = string;
export const isID = (value?: BasicValue): value is ID => typeof value === 'string';
export type CDATA = string;
export const isCDATA = (value?: BasicValue): value is CDATA => typeof value === 'string';
export type PCDATA = string;
export const isPCDATA = (value?: BasicValue): value is PCDATA => typeof value === 'string';
export type NMTOKEN = string;
export const isNMTOKEN = (value?: BasicValue): value is NMTOKEN => typeof value === 'string';
export type DisplayScale = 50 | 60 | 70 | 80 | 90 | 100 | 110 | 120 | 140 | 160 | 180 | 200;
export const isDisplayScale = (value?: BasicValue): value is DisplayScale => has([50, 60, 70, 80, 90, 100, 110, 120, 140, 160, 180, 200], value);
export type DisplayFrame = 'all' | 'bottom' | 'none' | 'sides' | 'top' | 'topbot';
export const isDisplayFrame = (value?: BasicValue): value is DisplayFrame => has(['all', 'bottom', 'none', 'sides', 'top', 'topbot'], value);
export type DisplayExpanse = 'column' | 'page' | 'spread' | 'textline';
export const isDisplayExpanse = (value?: BasicValue): value is DisplayExpanse => has(['column', 'page', 'spread', 'textline'], value);
export type NoteType = 'caution' | 'warning' | 'danger' | 'trouble' | 'notice' | 'note';
export const isNoteType = (value?: BasicValue): value is NoteType => has(['caution', 'warning', 'danger', 'trouble', 'notice', 'note'], value);

export type ReferenceContentScope = 'local' | 'peer' | 'external';
export const isReferenceContentScope = (value?: BasicValue): value is ReferenceContentScope =>
    has(['local', 'peer', 'external'], value);

export const nodeGroups: Record<string, Array<string>> = {
    'common-inline': ['text', 'ph', 'image', 'data'],
    'all-inline': ['text', 'ph', 'image', 'xref', 'data'],
    'simple-blocks': ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'fn', 'note', 'data'],
    'fn-blocks': ['p', 'ul', 'ol', 'dl', 'data'],
    'all-blocks': ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'simpletable', 'fig', 'fn', 'note', 'data'],
    'list-blocks': ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'simpletable', 'fig', 'note', 'data'],
    'fig-blocks': ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'simpletable', 'data'],
}

export type Attributes = Record<string, SaxesAttributeNS> | Record<string, string>;

export function areFieldsValid(fields: string[], value: Record<string, BasicValue>, ...validations: ((field: string, value: BasicValue) => boolean)[]): boolean {
    for (const field of fields) {
        let valid = false;
        for (const validation of validations) {
            if (validation(field, value[field])) {
                valid = true;
                break;
            }
        }
        if (!valid) {
            return false;
        }
    }
    return true;
}

export interface XMLNode<T extends string = string> {
    name: T;
    attributes: Attributes;
}
