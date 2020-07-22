import { DisplayScale, DisplayFrame, DisplayExpanse, isOrUndefined, isDisplayScale, isDisplayFrame, isDisplayExpanse } from "../utils";

export interface DisplayAttributes {
  scale?: DisplayScale;
  frame?: DisplayFrame;
  expanse?: DisplayExpanse;
}
export const isDisplayAttributes = (value?: any): value is DisplayAttributes =>
  typeof value === 'object' &&
  isOrUndefined(isDisplayScale, value['scale']) &&
  isOrUndefined(isDisplayFrame, value['frame']) &&
  isOrUndefined(isDisplayExpanse, value['expanse']);
