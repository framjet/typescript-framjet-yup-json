import { BaseValidationTypeParser } from './_base';
import type { BooleanTypeRules, BooleanValidationType } from '../rules';
import { boolean, type BooleanSchema } from 'yup';

export class BooleanValidationTypeParser extends BaseValidationTypeParser<BooleanValidationType, BooleanTypeRules, BooleanSchema> {
  parse(type: BooleanValidationType): BooleanSchema {
    return this.parseRules(
      type,
      this.createSchema()
    );
  }

  parseTypeRule(rule: BooleanTypeRules): BooleanSchema {
    throw new Error('Unsupported Boolean type rule' + rule.t);
  }

  protected createSchema(): BooleanSchema {
    return boolean();
  }
}
