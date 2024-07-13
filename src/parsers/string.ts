import { BaseValidationTypeParser } from './_base';
import type { StringTypeRules, StringValidationType } from '../rules';
import { string, StringSchema } from 'yup';

export class StringValidationTypeParser extends BaseValidationTypeParser<StringValidationType, StringTypeRules, StringSchema> {
  parse(type: StringValidationType): StringSchema {
    return this.parseRules(
      type,
      this.createSchema()
    );
  }

  parseTypeRule(rule: StringTypeRules, schema: StringSchema): StringSchema {
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
      case 'matches':
        return schema.matches(
          this.parseRegXp(rule.regex),
          {
            message: rule.message,
            excludeEmptyString: rule.excludeEmptyString
          }
        );
      case 'email':
        return schema.email(rule.message);
      case 'url':
        return schema.url(rule.message);
      case 'uuid':
        return schema.uuid(rule.message);
      case 'datetime':
        return schema.datetime(
          {
            precision: rule.precision,
            allowOffset: rule.allowOffset,
            message: rule.message
          }
        );
      case 'ensure':
        return schema.ensure();
      case 'trim':
        return schema.trim(rule.message);
      case 'lower.case':
        return schema.lowercase(rule.message);
      case 'upper.case':
        return schema.uppercase(rule.message);
      case 'length':
        return schema.length(
          this.ref(rule.limit),
          rule.message
        );
      default:
        throw new Error('Unsupported String type ' + rule.t);
    }
  }

  protected createSchema(): StringSchema {
    return string();
  }

  protected parseRegXp(input: string): RegExp {
    return new RegExp(input);
  }
}
