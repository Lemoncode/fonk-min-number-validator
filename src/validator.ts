import { FieldValidationFunctionSync } from '@lemoncode/fonk';
import { CustomValidatorArgs } from './validator.model';
import { isDefined, buildCustomMessage } from './validator.business';

const VALIDATOR_TYPE = 'MIN_NUMBER';

let defaultMessage = 'The value must be greater than or equal to {{minValue}}';
export const setErrorMessage = (message: string) => (defaultMessage = message);

let defaultCustomArgs: CustomValidatorArgs = {
  strictTypes: false,
  minValue: 0,
  inclusive: true,
};
export const setCustomArgs = (customArgs: CustomValidatorArgs) =>
  (defaultCustomArgs = customArgs);

const validateType = (value, args: CustomValidatorArgs) =>
  !args.strictTypes || typeof value === 'number';

const validate = (value, args: CustomValidatorArgs) =>
  !isNaN(Number(value)) && args.inclusive
    ? value >= args.minValue
    : value > args.minValue;

export const validator: FieldValidationFunctionSync<
  CustomValidatorArgs
> = fieldValidatorArgs => {
  const {
    value,
    message = defaultMessage,
    customArgs = defaultCustomArgs,
  } = fieldValidatorArgs;

  const args: CustomValidatorArgs = {
    ...defaultCustomArgs,
    ...customArgs,
  };

  const succeeded =
    !isDefined(value) || (validateType(value, args) && validate(value, args));

  return {
    succeeded,
    message: succeeded
      ? ''
      : buildCustomMessage((message as string) || defaultMessage, args),
    type: VALIDATOR_TYPE,
  };
};
