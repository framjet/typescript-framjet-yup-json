import type { BaseValidationType, Referable } from '../rule';
import type { SchemaRule, SchemaTypeRules } from './schema';
import type { ProcessRules } from '../utils';
import type { NumberSchema } from 'yup';

export const NumberType: unique symbol = Symbol('NumberType');

export interface NumberRule extends SchemaRule {
  readonly [NumberType]?: never;
}
export interface MinRule extends NumberRule {
  t: 'min';
  limit: Referable<number>;
  message?: string;
}

export interface MaxRule extends NumberRule {
  t: 'max';
  limit: Referable<number>;
  message?: string;
}

export interface LessThanRule extends NumberRule {
  t: 'less.than';
  max: Referable<number>;
  message?: string;
}

export interface MoreThanRule extends NumberRule {
  t: 'more.than';
  min: Referable<number>;
  message?: string;
}

export interface PositiveRule extends NumberRule {
  t: 'positive';
  message?: string;
}

export interface NegativeRule extends NumberRule {
  t: 'negative';
  message?: string;
}

export interface IntegerRule extends NumberRule {
  t: 'integer';
  message?: string;
}

export interface TruncateRule extends NumberRule {
  t: 'truncate';
}

export interface RoundRule extends NumberRule {
  t: 'round';
  round?: 'floor' | 'ceil' | 'trunc' | 'round'
}

export interface NumberTypeRulesRegistry {
  min: MinRule;
  max: MaxRule;
  'less.than': LessThanRule;
  'more.than': MoreThanRule;
  positive: PositiveRule;
  negative: NegativeRule;
  integer: IntegerRule;
  truncate: TruncateRule;
  round: RoundRule;
}

export type NumberTypeRules = SchemaTypeRules | NumberTypeRulesRegistry[keyof NumberTypeRulesRegistry];


export interface NumberValidationType extends BaseValidationType<NumberSchema> {
  t: 'number';
  rules?: ProcessRules<NumberTypeRules>[];
}



