import { type Referable, type Rule, type ValidationType, type ValidationTypeSchemaType } from '../rule';
import { ref, Reference, type Schema } from 'yup';
import type { ProcessRules } from '../utils';
import type { ValidationTypeParser } from '../parser';
import type { SchemaTypeRules } from '../rules';
import { parseYupDefinition } from '../';

export abstract class BaseValidationTypeParser<TValidationType extends ValidationType, TRule extends Rule, TSchema extends Schema> implements ValidationTypeParser<TValidationType, TRule, TSchema> {

  protected readonly customValidations = new Map<string, ((rule: TRule, schema: TSchema) => TSchema)>();

  abstract parse(validationType: TValidationType): TSchema;

  public addCustomValidation<T extends TRule>(name: T['t'], validator: (rule: T, schema: TSchema) => TSchema) {
    if (this.customValidations.has(name)) {
      throw new Error(`Custom validator "${name}" already exists`);
    }

    this.customValidations.set(name, validator);
  }

  protected parseRules(rules: ProcessRules<TRule>[], schema: TSchema): TSchema {
    let s = schema;
    for (const rule of rules) {
      if (typeof rule !== 'string') {
        s = this.parseRule(rule as never, s);
      } else {
        s = this.parseRule({ t: rule }, s);
      }
    }

    return s;
  }

  protected abstract createSchema(validationType: TValidationType): TSchema;

  protected abstract parseTypeRule(rule: TRule, schema: TSchema): TSchema;

  protected parseRule(rule: SchemaTypeRules, schema: TSchema): TSchema {
    const type = rule.t;
    switch (type) {
      case 'label':
        return schema.label(rule.label);
      case 'strict':
        return schema.strict(rule.enabled);
      case 'strip':
        return schema.strip(rule.enabled as never);
      case 'nullable':
        return schema.nullable();
      case 'non.nullable':
        return schema.nonNullable(rule.message);
      case 'defined':
        return schema.defined(rule.message);
      case 'optional':
        return schema.optional();
      case 'required':
        return schema.required(rule.message);
      case 'not.required':
        return schema.notRequired();
      case 'type.error':
        return schema.typeError(rule.message);
      case 'one.of':
        return schema.oneOf(rule.values, rule.message);
      case 'not.one.of':
        return schema.notOneOf(rule.values, rule.message);
      default:
        if (this.customValidations.has(type)) {
          return this.customValidations.get(type)(rule, schema);
        }

        return this.parseTypeRule(rule, schema);
    }
  }

  protected parseValidatorType<X extends ValidationType>(validationType: X): ValidationTypeSchemaType<X> {
    return parseYupDefinition(validationType);
  }

  protected ref<T>(input: Referable<T>): T | Reference<T> {
    if (typeof input === 'object' && 'ref' in input) {
      return ref(input.ref);
    }

    return input;
  }
}
