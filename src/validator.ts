import { FieldValidationFunctionSync } from '@lemoncode/fonk';

const VALIDATOR_TYPE = 'MIN_NUMBER';

let defaultMessage = 'The value must be greater than or equal to {{minValue}}';
export const setErrorMessage = (message: string) => (defaultMessage = message);

const buildCustomMessage = (message: string, args: CustomValidatorArgs) =>
  message &&
  Object.keys(args).reduce(
    (accum, current) =>
      accum.replace(new RegExp(`{{${current}}}`, 'gi'), args[current]),
    message
  );

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
    message: succeeded
      ? ''
      : (buildCustomMessage(
          (message as string) || defaultMessage,
          args
        ) as string),
    type: VALIDATOR_TYPE,
  };
};
