import { SaxesAttributeNS } from "saxes";

export function has<T>(array: Array<T>, value: T): boolean {
    return array.indexOf(value) >= 0;
}

export type DefinedBasicValue = number | boolean | string | Array<BasicValue> | {} | {
    [key: string]: BasicValue;
    [key: number]: BasicValue;
};

export type OrArray<T> = T | (T | OrArray<T>)[];

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
    required: boolean;
    single: boolean;
    isGroup: boolean;
}
export type ChildTypes = OrArray<ChildType>;

export function splitTypenames(value: string): string[] { 
    if (value[0] !== '(') {
        return value.split('|');
    }
    const last = value.slice(-1);
    return has(['+', '*', '?'], last)
        ? value.slice(1, -2).split('|').map(type => type + last)
        : value.slice(1, -1).split('|');
}

export function stringToChildTypes(value: OrArray<string>): ChildTypes {
    if (typeof value === 'string') {
        if (value.indexOf('|') < 0) {
            const last = value.slice(-1);
            const result: ChildType = has(['+', '*', '?'], last)
            ? {
                name: value.slice(0, -1),
                single: last === '?',
                required: last === '+',
                isGroup: false,
            } : {
                name: value,
                single: true,
                required: true,
                isGroup: false,
            };
            if (result.name[0] === '%') {
                result.name = result.name.substr(1);
                result.isGroup = true;
            }
            return result;
        } else {
            return stringToChildTypes(splitTypenames(value));
        }
    } else {
        return value.map(stringToChildTypes);
    }
}

export function acceptsNodeName(value: string, childType: string | ChildTypes): ChildType | undefined {
    if (Array.isArray(childType)) {
        let result: ChildType | undefined;
        childType.some(type => {
            result = acceptsNodeName(value, type);
            if (result) {
                return true;
            }
        });
        return result;
    } else {
        if (typeof childType === 'string') {
            return acceptsNodeName(value, stringToChildTypes(childType));
        }
        return !childType.isGroup
            ? (childType.name === value ? childType : undefined)
            : (has(nodeGroups[childType.name], value) ? childType : undefined);
    }
}

export function isChildTypeSingle(childType: string | ChildType | ChildTypes): boolean {
    if (Array.isArray(childType)) {
        let result = true;
        childType.some(type => {
            result = isChildTypeSingle(type);
            return !result;
        });
        return result;
    } else {
        if (typeof childType === 'string') {
            return isChildTypeSingle(stringToChildTypes(childType));
        }
        return !!childType.single;
    }
}
export function isChildTypeRequired(childType: string | ChildType | ChildTypes): boolean {
    if (Array.isArray(childType)) {
        let result = true;
        childType.some(type => {
            result = !isChildTypeRequired(type);
            return !result;
        });
        return result;
    } else {
        if (typeof childType === 'string') {
            return isChildTypeRequired(stringToChildTypes(childType));
        }
        return !!childType.required;
    }
}

export function childTypesArray(childTypes: ChildTypes): ChildTypes[] {
    return Array.isArray(childTypes) ? childTypes : [childTypes];
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
