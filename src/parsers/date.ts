import { parse } from 'date-fns/parse';
import { BaseValidationTypeParser } from './_base';
import type { DateTypeRules, DateValidationType } from '../rules';
import { date, type DateSchema, type Reference } from 'yup';

export class DateValidationTypeParser extends BaseValidationTypeParser<DateValidationType, DateTypeRules, DateSchema> {
  parse(type: DateValidationType): DateSchema {
    return this.parseRules(
      type,
      this.createSchema()
    );
  }

  parseTypeRule(rule: DateTypeRules, schema: DateSchema): DateSchema {
    switch (rule.t) {
      case 'min':
        return schema.min(
          this.parseDate(this.ref(rule.limit), rule.format),
          rule.message
        );
      case 'max':
        return schema.max(
          this.parseDate(this.ref(rule.limit), rule.format),
          rule.message
        );
      default:
        throw new Error('Unsupported Date type rule' + rule.t);
    }
  }

  protected createSchema(): DateSchema {
    return date();
  }

  protected parseDate(input: string | Reference<string>, format?: string): Date | string | Reference<string> {
    if (typeof input === 'string' && format != null) {
      return parse(input, format, new Date());
    }

    return input;
  }
}
