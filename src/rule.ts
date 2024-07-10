import {
  type ArrayValidationType,
  type BooleanValidationType,
  type DateValidationType,
  type MixedValidationType,
  type NumberValidationType,
  type ObjectValidationType,
  type StringValidationType,
  type TupleValidationType
} from './rules';
import type { Schema } from 'yup';

export const YupSchemaType: unique symbol = Symbol.for('YupSchemaType');

export interface BaseValidationType<TSchema extends Schema<any>> {
  t: string;
  readonly [YupSchemaType]?: TSchema;
}

export type ValidationTypeSchemaType<T> = T extends BaseValidationType<infer U> ? U : never;

export interface Rule {
  t: string;
}

export type RefRule = {
  ref: string;
}

export type Referable<T> = T | RefRule;

export interface ValidationTypeRegistry {
  array: ArrayValidationType;
  boolean: BooleanValidationType;
  date: DateValidationType;
  mixed: MixedValidationType;
  number: NumberValidationType;
  object: ObjectValidationType;
  string: StringValidationType;
  tuple: TupleValidationType;
}

export type ValidationType = ValidationTypeRegistry[keyof ValidationTypeRegistry];

