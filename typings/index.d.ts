import { FieldValidationFunctionSync } from '@lemoncode/fonk';

export namespace minNumber {
  export interface CustomValidatorArgs {
    strictTypes?: boolean;
    minValue: number;
    inclusive?: boolean;
  }
  export const validator: FieldValidationFunctionSync<CustomValidatorArgs>;
  export function setErrorMessage(message: string | string[]): void;
  export function setCustomArgs(customArgs: Partial<CustomValidatorArgs>): void;
}
