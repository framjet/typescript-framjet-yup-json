import type { BaseValidationType, Referable, RefRule, ValidationType, ValidationTypeSchemaType } from '../rule';
import type { SchemaRule, SchemaTypeRules } from './schema';
import type { ProcessRules } from '../utils';
import { type ObjectSchema, type Reference } from 'yup';

export const ObjectType: unique symbol = Symbol('ObjectType');

export interface ObjectRule extends SchemaRule {
  readonly [ObjectType]?: never;
}

export interface NoUnknownRule extends ObjectRule {
  t: 'no.unknown';
  message?: string;
}

export interface ObjectTypeRulesRegistry {
  'no.unknown': NoUnknownRule;
}

export type ObjectTypeRules = SchemaTypeRules | ObjectTypeRulesRegistry[keyof ObjectTypeRulesRegistry];

type ObjectShape = {
  [k: string]: Referable<ValidationType>;
};

type ObjectField<T> = T extends RefRule ? Reference : ValidationTypeSchemaType<T>;

type ObjectShapeToSchema<T extends ObjectShape> = {
  [K in keyof T]: ObjectField<T[K]>
}

export interface ObjectValidationType extends BaseValidationType<ObjectSchema<any>> {
  t: 'object';
  fields: ObjectShape;
  rules?: ProcessRules<ObjectTypeRules>[];
}
