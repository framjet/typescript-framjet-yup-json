import { BaseValidationTypeParser } from './_base';
import type { TupleValidationType } from '../rules';
import { tuple, type TupleSchema } from 'yup';
import type { Rule } from '@framjet/yup-json';

export class TupleValidationTypeParser extends BaseValidationTypeParser<TupleValidationType, Rule, TupleSchema> {
  parse(type: TupleValidationType): TupleSchema {
    return this.createSchema(type);
  }

  parseTypeRule(rule: Rule): TupleSchema {
    throw new Error('Unsupported Tuple type rule' + rule.t);
  }

  protected createSchema(type: TupleValidationType): TupleSchema {
    const items = type.items.map(i => {
      return this.parseValidatorType(i);
    });

    const schema = tuple(items as never);

    if (type.label != null) {
      return schema.label(type.label);
    }

    return schema;
  }
}
