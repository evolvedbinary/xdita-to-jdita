/* eslint-disable @typescript-eslint/no-explicit-any */

import { SaxesAttributeNS } from "saxes";

export const has = (array: Array<any>, value: any): boolean => array.indexOf(value) >= 0;

export function isOrUndefined<T>(check: (value?: any) => boolean, value?: any): value is T | undefined {
    return typeof value ==='undefined' || check(value);
}

// TODO(AR) can we further refine these types?
export type ID = string;
export const isID = (value?: any): value is ID =>  typeof value ==='string';
export type CDATA = string;
export const isCDATA = (value?: any): value is CDATA =>  typeof value ==='string';
export type PCDATA = string;
export const isPCDATA = (value?: any): value is PCDATA =>  typeof value ==='string';
export type NMTOKEN = string;
export const isNMTOKEN = (value?: any): value is NMTOKEN =>  typeof value ==='string';
export type DisplayScale = 50 | 60 | 70 | 80 | 90 | 100 | 110 | 120 | 140 | 160 | 180 | 200;
export const isDisplayScale = (value?: any): value is DisplayScale =>  has([50, 60, 70, 80, 90, 100, 110, 120, 140, 160, 180, 200], value);
export type DisplayFrame = 'all' | 'bottom' | 'none' | 'sides' | 'top' | 'topbot';
export const isDisplayFrame = (value?: any): value is DisplayFrame =>  has(['all', 'bottom', 'none', 'sides', 'top', 'topbot'], value);
export type DisplayExpanse = 'column' | 'page' | 'spread' | 'textline';
export const isDisplayExpanse = (value?: any): value is DisplayExpanse =>  has(['column', 'page', 'spread', 'textline'], value);
export type NoteType = 'caution' | 'warning' | 'danger' | 'trouble' | 'notice' | 'note';
export const isNoteType = (value?: any): value is NoteType =>  has(['caution', 'warning', 'danger', 'trouble', 'notice', 'note'], value);

// TODO(AR) should these be union types, or should they be base interfaces which other interfaces like `ph` inherit from?
export type ReferenceContentScope = 'local' | 'peer' | 'external';
export const isReferenceContentScope = (value?: any): value is ReferenceContentScope =>
    has(['local', 'peer', 'external'], value);
export const nodeGroups: Record<string, Array<string>> = {
    'common-inline': ['text', 'ph', 'image', 'data'],
    'all-inline'   : ['text', 'ph', 'image', 'xref', 'data'],
    'simple-blocks': ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'fn', 'note', 'data'],
    'fn-blocks'    : ['p', 'ul', 'ol', 'dl', 'data'],
    'all-blocks'   : ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'simpletable', 'fig', 'fn', 'note', 'data'],
    'list-blocks'  : ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'simpletable', 'fig', 'note', 'data'],
    'fig-blocks'   : ['p', 'ul', 'ol', 'dl', 'pre', 'audio', 'video', 'simpletable', 'data'],
}

export type Attributes = Record<string, SaxesAttributeNS> | Record<string, string>;

export function areFieldsValid(fields: string[], value: any, ...validations: ((field: string, value: any) => boolean)[]): boolean {
    for (const field of fields) {
        let valid = false;
        for (const validation of validations) {
            if (validation(field, value)) {
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
