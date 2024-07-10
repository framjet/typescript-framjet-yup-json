import type { SchemaRule, SchemaTypeRules } from './schema';
import type { BaseValidationType, Referable, ValidationType } from '../rule';
import type { ProcessRules } from '../utils';
import type { ArraySchema } from 'yup';

export const ArrayType: unique symbol = Symbol('ArrayType');

export interface ArrayRule extends SchemaRule {
  readonly [ArrayType]?: never;
}

export interface ArrayLengthRule extends ArrayRule {
  t: 'length';
  limit: Referable<number>;
  message?: string;
}

export interface ArrayMinRule extends ArrayRule {
  t: 'min';
  limit: Referable<number>;
  message?: string;
}

export interface ArrayMaxRule extends ArrayRule {
  t: 'max';
  limit: Referable<number>;
  message?: string;
}

export interface ArrayEnsureRule extends ArrayRule {
  t: 'ensure';
}

export interface ArrayTypeRulesRegistry {
  length: ArrayLengthRule;
  min: ArrayMinRule;
  max: ArrayMaxRule;
  ensure: ArrayEnsureRule;
}

export type ArrayTypeRules = SchemaTypeRules | ArrayTypeRulesRegistry[keyof ArrayTypeRulesRegistry];

export interface ArrayValidationType extends BaseValidationType<ArraySchema<any, any>> {
  t: 'array';
  of: ValidationType;
  rules?: ProcessRules<ArrayTypeRules>[];
}
