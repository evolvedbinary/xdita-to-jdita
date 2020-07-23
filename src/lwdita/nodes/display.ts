import { DisplayScale, DisplayFrame, DisplayExpanse, isOrUndefined, isDisplayScale, isDisplayFrame, isDisplayExpanse, areFieldsValid, BasicValue } from "../utils";
import { BaseNode } from "./base";

export const DisplayFields = ['scale', 'frame', 'expanse'];
export interface DisplayNode {
  'scale'?: DisplayScale;
  'frame'?: DisplayFrame;
  'expanse'?: DisplayExpanse;
}

export function isValidDisplayField(field: string, value: BasicValue): boolean {
  switch (field) {
    case 'scale': return isOrUndefined(isDisplayScale, value);
    case 'frame': return isOrUndefined(isDisplayFrame, value);
    case 'expanse': return isOrUndefined(isDisplayExpanse, value);
    default: return false;
  }
}

export const isDisplayNode = (value?: {}): value is DisplayNode =>
  typeof value === 'object' && areFieldsValid(DisplayFields, value, isValidDisplayField);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeDisplay<T extends { new(...args: any[]): BaseNode }>(constructor: T): T {
  return class extends constructor implements DisplayNode {
    get 'scale'(): DisplayScale | undefined {
      return this.readProp<DisplayScale | undefined>('scale');
    }
    set 'scale'(value: DisplayScale | undefined) {
      this.writeProp<DisplayScale | undefined>('scale', value);
    }
    get 'frame'(): DisplayFrame | undefined {
      return this.readProp<DisplayFrame | undefined>('frame');
    }
    set 'frame'(value: DisplayFrame | undefined) {
      this.writeProp<DisplayFrame | undefined>('frame', value);
    }
    get 'expanse'(): DisplayExpanse | undefined {
      return this.readProp<DisplayExpanse | undefined>('expanse');
    }
    set 'expanse'(value: DisplayExpanse | undefined) {
      this.writeProp<DisplayExpanse | undefined>('expanse', value);
    }
  }
}
