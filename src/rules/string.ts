import type { BaseValidationType, Referable } from '../rule';
import type { SchemaRule, SchemaTypeRules } from './schema';
import type { ProcessRules } from '../utils';
import { string, type StringSchema } from 'yup';

export const StringType: unique symbol = Symbol('StringType');

export interface StringRule extends SchemaRule {
  readonly [StringType]?: never;
}

export interface StringLengthRule extends StringRule {
  t: 'length';
  limit: Referable<number>;
  message?: string;
}

export interface StringMinRule extends StringRule {
  t: 'min';
  limit: Referable<number>;
  message?: string;
}

export interface StringMaxRule extends StringRule {
  t: 'max';
  limit: Referable<number>;
  message?: string;
}

export interface MatchesRule extends StringRule {
  t: 'matches';
  regex: string;
  message?: string;
  excludeEmptyString?: boolean;
}

export interface EmailRule extends StringRule {
  t: 'email';
  message?: string;
}

export interface URLRule extends StringRule {
  t: 'url';
  message?: string;
}

export interface UUIDRule extends StringRule {
  t: 'uuid';
  message?: string;
}

export interface DateTimeRule extends StringRule {
  t: 'datetime';
  message?: string;
  allowOffset?: boolean;
  precision?: number;
}

export interface StringEnsureRule extends StringRule {
  t: 'ensure';
}

export interface TrimRule extends StringRule {
  t: 'trim';
  message?: string;
}

export interface LowerCaseRule extends StringRule {
  t: 'lower.case';
  message?: string;
}

export interface UpperCaseRule extends StringRule {
  t: 'upper.case';
  message?: string;
}

export interface UlidRule extends StringRule {
  t: 'ulid';
  message?: string;
}

export interface StringTypeRulesRegistry {
  length: StringLengthRule;
  min: StringMinRule;
  max: StringMaxRule;
  matches: MatchesRule;
  email: EmailRule;
  url: URLRule;
  uuid: UUIDRule;
  datetime: DateTimeRule;
  ensure: StringEnsureRule;
  trim: TrimRule;
  'lower.case': LowerCaseRule;
  'uppercase.case': UpperCaseRule;
}

export type StringTypeRules = SchemaTypeRules<string> | StringTypeRulesRegistry[keyof StringTypeRulesRegistry];


export interface StringValidationType extends BaseValidationType<StringSchema> {
  t: 'string';
  rules?: ProcessRules<StringTypeRules>[]
}



