export const TextFields = ['content'];
export interface TextAttributes {
  'content'?: string;
}
export const isTextAttributes = (value?: any): value is TextAttributes => typeof value === 'object' && typeof value.content === 'string';