import type { Rule } from '../rule';

export const SchemaType: unique symbol = Symbol('SchemaType');
export interface SchemaRule extends Rule {
  readonly [SchemaType]?: never;
}

export interface LabelRule extends SchemaRule {
  t: 'label';
  label: string;
}

export interface StrictRule extends SchemaRule {
  t: 'strict';
  enabled: boolean;
}

export interface StripRule extends SchemaRule {
  t: 'strip';
  enabled: boolean;
}

export interface NullableRule extends SchemaRule {
  t: 'nullable';
  message?: string;
}

export interface NonNullableRule extends SchemaRule {
  t: 'non.nullable';
  message?: string;
}

export interface DefinedRule extends SchemaRule {
  t: 'defined';
  message?: string;
}

export interface OptionalRule extends SchemaRule {
  t: 'optional';
}

export interface RequiredRule extends SchemaRule {
  t: 'required';
  message?: string;
}

export interface NotRequiredRule extends SchemaRule {
  t: 'not.required';
}

export interface TypeErrorRule extends SchemaRule {
  t: 'type.error';
  message?: string;
}

export interface OneOfRule<T> extends SchemaRule {
  t: 'one.of';
  values: T[];
  message?: string;
}

export interface NotOneOfRule<T> extends SchemaRule {
  t: 'not.one.of';
  values: T[];
  message?: string;
}

export interface SchemaTypeRulesRegistry<T> {
  label: LabelRule;
  strict: StrictRule;
  strip: StripRule;
  nullable: NullableRule;
  'non.nullable': NonNullableRule;
  defined: DefinedRule;
  optional: OptionalRule;
  required: RequiredRule;
  'not.required': NotRequiredRule;
  'type.error': TypeErrorRule;
  'one.of': OneOfRule<T>;
  'not.one.of': NotOneOfRule<T>;
}

export type SchemaTypeRules<T = unknown> = SchemaTypeRulesRegistry<T>[keyof SchemaTypeRulesRegistry<T>];
