import { SaxesAttributeNS } from "saxes";

export type DefinedBasicValue = number | boolean | string | Array<BasicValue> | {} | {
  [key: string]: BasicValue;
  [key: number]: BasicValue;
};

export type Attributes = Record<string, SaxesAttributeNS> | Record<string, string>;

export interface XMLNode<T extends string = string> {
    name: T;
    attributes: Attributes;
}

export type ReferenceContentScope = 'local' | 'peer' | 'external';

export type OrArray<T> = T | (T | OrArray<T>)[];

export type BasicValue = undefined | DefinedBasicValue;

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
export const isDisplayScale = (value?: BasicValue): value is DisplayScale => ([50, 60, 70, 80, 90, 100, 110, 120, 140, 160, 180, 200] as BasicValue[]).indexOf(value) > -1;
export type DisplayFrame = 'all' | 'bottom' | 'none' | 'sides' | 'top' | 'topbot';
export const isDisplayFrame = (value?: BasicValue): value is DisplayFrame => (['all', 'bottom', 'none', 'sides', 'top', 'topbot'] as BasicValue[]).indexOf(value) > -1;
export type DisplayExpanse = 'column' | 'page' | 'spread' | 'textline';
export const isDisplayExpanse = (value?: BasicValue): value is DisplayExpanse => (['column', 'page', 'spread', 'textline'] as BasicValue[]).indexOf(value) > -1;
export type NoteType = 'caution' | 'warning' | 'danger' | 'trouble' | 'notice' | 'note';
export const isNoteType = (value?: BasicValue): value is NoteType => (['caution', 'warning', 'danger', 'trouble', 'notice', 'note'] as BasicValue[]).indexOf(value) > -1;

export interface ChildType {
    name: string;
    required: boolean;
    single: boolean;
    isGroup: boolean;
}
export type ChildTypes = OrArray<ChildType>;

export class UnknownNodeError extends Error {
  name = 'unknown-node';
}
export class UnknownAttributeError extends Error {
  name = 'unknown-attribute';
}
export class WrongAttributeTypeError extends Error {
  name = 'wrong-attribute-type';
}
export class NonAcceptedChildError extends Error {
  name = 'non-accepted-child';
}
