import { FieldValidationFunctionSync } from '@lemoncode/fonk';

export namespace minNumber {
  export const validator: FieldValidationFunctionSync;
  export function setErrorMessage(message: string | string[]): void;
}
