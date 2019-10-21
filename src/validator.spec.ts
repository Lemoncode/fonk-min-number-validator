import { validator, setErrorMessage, setCustomArgs } from './validator';

const VALIDATOR_TYPE = 'MIN_NUMBER';
const TEST_MESSAGE = 'Custom message for tests';

describe('fonk-min-number-validator specs', () => {
  it('should return succeeded validation when it feeds value equals undefined', () => {
    // Arrange
    const value = void 0;

    // Act
    const result = validator({ value });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value equals null', () => {
    // Arrange
    const value = null;

    // Act
    const result = validator({ value });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value equals empty string', () => {
    // Arrange
    const value = '';

    // Act
    const result = validator({ value });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should overwrite default message when it feeds value and message', () => {
    // Arrange
    const value = 'test';

    // Act
    const result = validator({ value, message: TEST_MESSAGE });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: TEST_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value is greater than min-value', () => {
    // Arrange
    const value = 2;

    // Act
    const result = validator({
      value,
      customArgs: { minValue: 1 },
    });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value is equal to min-value, with inclusive flag true by default', () => {
    // Arrange
    const value = 1;

    // Act
    const result = validator({
      value,
      customArgs: { minValue: 1 },
    });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is equal to min-value, within inclusive flag', () => {
    // Arrange
    const value = 1;

    // Act
    const result = validator({
      value,
      message: 'The value must be greater than 1',
      customArgs: { minValue: 1, inclusive: false },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be greater than 1',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is less than min-value', () => {
    // Arrange
    const value = 1;

    // Act
    const result = validator({
      value,
      customArgs: { minValue: 2 },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be greater than or equal to 2',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when type of feeds value is string', () => {
    // Arrange
    const value = 'a';

    // Act
    const result = validator({
      value,
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be greater than or equal to 0',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is true', () => {
    // Arrange
    const value = true;

    // Act
    const result = validator({
      value,
      customArgs: { strictTypes: true, minValue: 0 },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be greater than or equal to 0',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is false', () => {
    // Arrange
    const value = false;

    // Act
    const result = validator({
      value,
      customArgs: { strictTypes: true, minValue: 0 },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be greater than or equal to 0',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is an object', () => {
    // Arrange
    const value = {};

    // Act
    const result = validator({
      value,
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be greater than or equal to 0',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is an array', () => {
    // Arrange
    const value = [];

    // Act
    const result = validator({
      value,
      customArgs: { strictTypes: true, minValue: 0 },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be greater than or equal to 0',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is a function', () => {
    // Arrange
    const value = () => null;

    // Act
    const result = validator({
      value,
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be greater than or equal to 0',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation with interpolated message', () => {
    // Arrange
    const value = 99;

    // Act
    const result = validator({
      value,
      message:
        'The minimum value is {{minValue}} and value is less than {{minValue}}!',
      customArgs: {
        minValue: 100,
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The minimum value is 100 and value is less than 100!',
      type: VALIDATOR_TYPE,
    });
  });

  it('should overwrite default message when it feeds value and calls to setErrorMessage', () => {
    // Arrange
    const value = 10;

    setErrorMessage('The value must be greater than {{minValue}}!');

    // Act
    const result = validator({
      value,
      customArgs: {
        minValue: 100,
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be greater than 100!',
      type: VALIDATOR_TYPE,
    });
  });

  it('should overwrite default customArgs when it feeds value is valid and calls to setCustomArgs', () => {
    // Arrange
    const value = '-1';

    setCustomArgs({ minValue: -5, strictTypes: false });

    // Act
    const result = validator({ value });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });
});
