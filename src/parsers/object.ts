import { BaseValidationTypeParser } from './_base';
import type { ObjectTypeRules, ObjectValidationType } from '../rules';
import { object, type ObjectSchema, ref, type Reference } from 'yup';
import type { Referable, ValidationType, ValidationTypeSchemaType } from '../rule';

export class ObjectValidationTypeParser extends BaseValidationTypeParser<ObjectValidationType, ObjectTypeRules, ObjectSchema<any>> {
  parse(type: ObjectValidationType): ObjectSchema<any> {
    return this.parseRules(
      type,
      this.createSchema(type)
    );
  }

  parseTypeRule(rule: ObjectTypeRules, schema: ObjectSchema<any>): ObjectSchema<any> {
    switch (rule.t) {
      case 'no.unknown':
        return schema.noUnknown(rule.message);
      default:
        throw new Error('Unsupported Object type rule' + rule.t);
    }
  }

  protected createSchema(type: ObjectValidationType): ObjectSchema<any> {
    const shape = Object.fromEntries(
      Object.entries(type.fields).map(([name, fieldType]) => [
        name,
        this.parseField(fieldType as never)
      ]));

    return object(shape);
  }

  protected parseField<T extends ValidationType>(type: Referable<T>): ValidationTypeSchemaType<T> | Reference {
    if ('ref' in type) {
      return ref(type.ref);
    }

    return this.parseValidatorType(type);
  }
}
