/* eslint-disable @typescript-eslint/no-explicit-any */

export interface NamedElementAttributes {
  readonly 'elementName': string;
}
export const isNamedElementAttributes = (value?: any): value is NamedElementAttributes =>
    typeof value === 'object' &&
    typeof value['elementName'] === 'string';
