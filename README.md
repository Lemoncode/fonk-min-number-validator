# fonk-min-number-validator

[![CircleCI](https://badgen.net/github/status/Lemoncode/fonk-min-number-validator/master?icon=circleci&label=circleci)](https://circleci.com/gh/Lemoncode/fonk-min-number-validator/tree/master)
[![NPM Version](https://badgen.net/npm/v/@lemoncode/fonk-min-number-validator?icon=npm&label=npm)](https://www.npmjs.com/package/@lemoncode/fonk-min-number-validator)
[![bundle-size](https://badgen.net/bundlephobia/min/@lemoncode/fonk-min-number-validator)](https://bundlephobia.com/result?p=@lemoncode/fonk-min-number-validator)

This is a [fonk](https://github.com/Lemoncode/fonk) microlibrary that brings validation capabilities to:

- Validate if a number field of a form is greater (or optionally equal) than a minimum value

How to install it:

```bash
npm install @lemoncode/fonk-min-number-validator --save
```

How to add it to an existing form validation schema:

We have the following form model:

```
const myFormValues = {
  product: 'shoes',
  price: 20,
}
```

We can add a minNumber validation to the myFormValues

```javascript
import { minNumber } from '@lemoncode/fonk-min-number-validator';

const validationSchema = {
  field: {
    price: [minNumber.validator],
  },
};
```

We can specify the minimun value allowed and if it is inclusive:

```javascript
import { minNumber } from '@lemoncode/fonk-min-number-validator';

const validationSchema = {
  field: {
    price: [
      {
        validator: minNumber.validator,
        customArgs: { minValue: 5, inclusive: false },
      },
    ],
  },
};
```

You can specify the custom arguments in two ways:

- Locally just customize the arguments for this validationSchema:

```javascript
import { minNumber } from '@lemoncode/fonk-min-number-validator';

const validationSchema = {
  field: {
    price: [
      {
        validator: minNumber.validator,
        customArgs: { minValue: 5, inclusive: false, strictTypes: true },
      },
    ],
  },
};
```

- Globally, replace the default custom arguments in all validationSchemas (e.g. enable strict types):

```javascript
import { minNumber } from '@lemoncode/fonk-min-number-validator';

minNumber.setCustomArgs({ minValue: 5, inclusive: false, strictTypes: true });
```

You can customize the error message displayed in two ways:

- Globally, replace the default error message in all validationSchemas (e.g. porting to spanish):

```javascript
import { minNumber } from '@lemoncode/fonk-min-number-validator';

minNumber.setErrorMessage('El campo debe de ser mayor que {{minValue}}');
```

- Locally just override the error message for this validationSchema:

```javascript
import { minNumber } from '@lemoncode/fonk-min-number-validator';

const validationSchema = {
  field: {
    price: [
      {
        validator: minNumber.validator,
        message: 'Error message only updated for the validation schema',
      },
    ],
  },
};
```

Please, refer to [fonk](https://github.com/Lemoncode/fonk) to know more.

## License

[MIT](./LICENSE)

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
