import { BaseValidationTypeParser } from './_base';
import type { ArrayTypeRules, ArrayValidationType } from '../rules';
import { array, type ArraySchema } from 'yup';

export class ArrayValidationTypeParser extends BaseValidationTypeParser<ArrayValidationType, ArrayTypeRules, ArraySchema<any, any>> {
  parse(type: ArrayValidationType): ArraySchema<any, any> {
    return this.parseRules(
      type.rules ?? [],
      this.createSchema(type)
    );
  }

  parseTypeRule(rule: ArrayTypeRules, schema: ArraySchema<any, any>): ArraySchema<any, any> {
    switch (rule.t) {
      case 'min':
        return schema.min(
          this.ref(rule.limit),
          rule.message
        );
      case 'max':
        return schema.max(
          this.ref(rule.limit),
          rule.message
        );
      case 'ensure':
        return schema.ensure();
      case 'length':
        return schema.length(
          this.ref(rule.limit),
          rule.message
        );
      default:
        throw new Error('Unsupported Array type rule' + rule.t);
    }
  }

  protected createSchema(validationType: ArrayValidationType): ArraySchema<any, any> {
    return array(this.parseValidatorType(validationType.of));
  }
}
