# @framjet/yup-json

FramJet yup-json is a powerful and flexible library that allows you to define Yup validation schemas using JSON structures. This makes it easy to create, serialize, and share complex validation rules across different parts of your application or even between the frontend and backend.

## Features

- Supports a wide range of validation types including arrays, booleans, dates, mixed types, numbers, objects, strings, and tuples.
- Custom validation rules can be easily added and managed.
- Integration with Yup to leverage its robust validation capabilities.
- Easy to use API for parsing and validating JSON-based schemas.

## Installation

You can install `@framjet/yup-json` using your preferred package manager:

npm:
```bash
npm install @framjet/yup-json
```

Yarn:
```bash
yarn add @framjet/yup-json
```

pnpm:
```bash
pnpm add @framjet/yup-json
```

## Usage


### Basic Usage

Here's a simple example of how to use `@framjet/yup-json` to define and validate a JSON schema.

```typescript
import { parseYupDefinition } from '@framjet/yup-json';

// Define a JSON schema for validation
const schema = {
  t: 'object',
  fields: {
    name: { t: 'string', rules: [{ t: 'required', message: 'Name is required' }] },
    age: { t: 'number', rules: [{ t: 'min', limit: 18, message: 'Must be at least 18 years old' }] },
  },
  rules: [{ t: 'no.unknown', message: 'No unknown fields allowed' }]
};

// Parse the JSON schema into a Yup schema
const yupSchema = parseYupDefinition(schema);

// Validate data against the Yup schema
const data = { name: 'John Doe', age: 25 };

yupSchema
  .validate(data)
  .then(validData => {
    console.log('Validation succeeded:', validData);
  })
  .catch(err => {
    console.error('Validation failed:', err.errors);
  });
```

### Supported Types

- `string`
- `number`
- `boolean`
- `date`
- `array`
- `object`
- `mixed`

Each type supports various validation rules that correspond to Yup's validation methods.

## API

### `parseYupDefinition(schema: ValidationType): ValidationTypeSchema`

Parses a JSON schema definition and returns a Yup schema.

## Extending

You can extend `@framjet/yup-json` with custom types and rules by accessing the `FramJetYupJsonParser` instance and adding custom parsers:

```typescript
import { getFramJetYupJsonParser } from '@framjet/yup-json';
import { addMethod, string } from 'yup';
import type { StringRule } from './string';

const pattern = /^[0-9A-HJKMNP-TV-Z]{26}$/;

function isULID(value) {
  return typeof value === 'string' && pattern.test(value);
}

addMethod(string, 'ulid', function (message) {
  return this.test('ulid', message, function(value) {
    const { path, createError } = this;
    return isULID(value) || createError({ path, message: message || 'Invalid ULID' });
  });
});

interface UlidRule extends StringRule {
  t: 'ulid';
  message?: string;
}

getFramJetYupJsonParser().getTypeParser('string').addCustomValidation('ulid', (rule: UlidRule, schema: StringSchema) => {
  return schema.ulid(rule.message);
});


declare module 'yup' {
  interface StringSchema {
    ulid(message?: string): StringSchema;
  }
}

declare module '@framjet/yup-json' {
  interface StringTypeRulesRegistry {
    ulid: UlidRule;
  }
}
```

## Contributing

Contributions to `@framjet/yup-json` are welcome! If you encounter any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue on the project's repository.

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
