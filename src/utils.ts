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
const phGroup = ['ph', 'b', 'i', 'u', 'sub', 'sup'];
const dataGroup = ['data'];
export const nodeGroups: Record<string, Array<string>> = {
    'ph': phGroup,
    'data': dataGroup,
    'common-inline': ['text', ...phGroup, 'image', ...dataGroup],
    'all-inline': ['text', ...phGroup, 'image', 'xref', ...dataGroup],
    'simple-blocks': ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'fn', 'note', ...dataGroup],
    'fn-blocks': ['p', 'ul', 'ol', 'dl', ...dataGroup],
    'all-blocks': ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'simpletable', 'fig', 'fn', 'note', ...dataGroup],
    'list-blocks': ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'simpletable', 'fig', 'note', ...dataGroup],
    'fig-blocks': ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'simpletable', ...dataGroup],
}

export interface ChildType {
    name: string;
    required?: boolean;
    single?: boolean;
    isGroup?: boolean;
}

export function stringToChildType(value: string): ChildType {
    const last = value.slice(-1);
    const result: ChildType = has(['+', '*', '?'], last)
    ? {
        name: value.slice(0, -1),
        single: last === '?',
        required: last === '+',
    } : {
        name: value,
        single: true,
        required: true,
    };
    if (result.name[0] === '%') {
        result.name = result.name.substr(1);
        result.isGroup = true;
    }
    return result;
}

export function stringsToChildTypes(value: string[]): ChildType[] {
    return value.map(stringToChildType);
}

export function nodeNameAccepted(value: string, nodeType: string | ChildType): boolean {
    if (typeof nodeType === 'string') {
        nodeType = stringToChildType(nodeType);
    }
    return !nodeType.isGroup
        ? nodeType.name === value
        : has(nodeGroups[nodeType.name], value);
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
