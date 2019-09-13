import { FieldValidationFunctionSync } from '@lemoncode/fonk';

const VALIDATOR_TYPE = 'MIN_NUMBER';

let defaultMessage = '';
export const setErrorMessage = (message: string) => (defaultMessage = message);

const createCustomMessage = (customArgs: CustomValidatorArgs) =>
  defaultMessage ||
  `The value must be greater than ${
    customArgs.inclusive === false ? '' : 'or equal to '
  }${customArgs.minValue}`;

const isDefined = value => value !== void 0 && value !== null && value !== '';

interface CustomValidatorArgs {
  minValue: number;
  inclusive?: boolean;
}

const defaultCustomArgs: CustomValidatorArgs = {
  minValue: 0,
  inclusive: true,
};

const validateType = value => typeof value === 'number';

const validate = (value, args: CustomValidatorArgs) =>
  args.inclusive ? value >= args.minValue : value > args.minValue;

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
    !isDefined(value) || (validateType(value) && validate(value, args));

  return {
    succeeded,
    message: (succeeded ? '' : message || createCustomMessage(args)) as string,
    type: VALIDATOR_TYPE,
  };
};
