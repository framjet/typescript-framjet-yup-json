import { BaseValidationTypeParser } from './_base';
import type { NumberTypeRules, NumberValidationType } from '../rules';
import { number, type NumberSchema } from 'yup';

export class NumberValidationTypeParser extends BaseValidationTypeParser<NumberValidationType, NumberTypeRules, NumberSchema> {
  parse(type: NumberValidationType): NumberSchema {
    return this.parseRules(
      type,
      this.createSchema()
    );
  }

  parseTypeRule(rule: NumberTypeRules, schema: NumberSchema): NumberSchema {
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
      case 'less.than':
        return schema.lessThan(
          this.ref(rule.max),
          rule.message
        );
      case 'more.than':
        return schema.moreThan(
          this.ref(rule.min),
          rule.message
        );
      case 'positive':
        return schema.positive(
          rule.message
        );
      case 'negative':
        return schema.negative(
          rule.message
        );
      case 'integer':
        return schema.integer(
          rule.message
        );
      case 'truncate':
        return schema.truncate();
      case 'round':
        return schema.round(
          rule.round
        );
      default:
        throw new Error('Unsupported Number type rule' + rule.t);
    }
  }

  protected createSchema(): NumberSchema {
    return number();
  }
}
