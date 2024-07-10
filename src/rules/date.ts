import type { SchemaRule, SchemaTypeRules } from './schema';
import type { BaseValidationType, Referable } from '../rule';
import type { ProcessRules } from '../utils';
import type { DateSchema } from 'yup';

export const DateType: unique symbol = Symbol('DateType');

export interface DateRule extends SchemaRule {
  readonly [DateType]?: never;
}

export interface DateMinRule extends DateRule {
  t: 'min';
  limit: Referable<string>;
  format?: string;
  message?: string;
}

export interface DateMaxRule extends DateRule {
  t: 'max';
  limit: Referable<string>;
  format?: string;
  message?: string;
}

export interface DateTypeRulesRegistry {
  min: DateMinRule;
  max: DateMaxRule;
}

export type DateTypeRules = SchemaTypeRules | DateTypeRulesRegistry[keyof DateTypeRulesRegistry];

export interface DateValidationType extends BaseValidationType<DateSchema> {
  t: 'date';
  rules?: ProcessRules<DateTypeRules>[];
}
