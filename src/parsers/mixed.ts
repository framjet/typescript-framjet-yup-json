import { BaseValidationTypeParser } from './_base';
import type { MixedTypeRules, MixedValidationType } from '../rules';
import { mixed, type MixedSchema } from 'yup';

export class MixedValidationTypeParser extends BaseValidationTypeParser<MixedValidationType, MixedTypeRules, MixedSchema> {
  parse(type: MixedValidationType): MixedSchema {
    return this.parseRules(
      type,
      this.createSchema()
    );
  }

  parseTypeRule(rule: MixedTypeRules): MixedSchema {
    throw new Error('Unsupported Mixed type rule' + rule.t);
  }

  protected createSchema(): MixedSchema {
    return mixed();
  }
}
