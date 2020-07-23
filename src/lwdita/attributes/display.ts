import { DisplayScale, DisplayFrame, DisplayExpanse, isOrUndefined, isDisplayScale, isDisplayFrame, isDisplayExpanse, areFieldsValid } from "../utils";

export const DisplayFields = ['scale', 'frame', 'expanse'];
export interface DisplayAttributes {
  'scale'?: DisplayScale;
  'frame'?: DisplayFrame;
  'expanse'?: DisplayExpanse;
}

export function isValidDisplayField(field: string, value: any): boolean {
  switch(field) {
    case 'scale': return isOrUndefined(isDisplayScale, value);
    case 'frame': return isOrUndefined(isDisplayFrame, value);
    case 'expanse': return isOrUndefined(isDisplayExpanse, value);
    default: return false;
  }
}
  
export const isDisplayAttributes = (value?: any): value is DisplayAttributes =>
  typeof value === 'object' && areFieldsValid(DisplayFields, value, isValidDisplayField);
