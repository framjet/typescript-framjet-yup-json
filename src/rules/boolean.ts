import type { SchemaTypeRules } from './schema';
import type { BaseValidationType } from '../rule';
import type { ProcessRules } from '../utils';
import type { BooleanSchema } from 'yup';

export type BooleanTypeRules = SchemaTypeRules;

export interface BooleanValidationType extends BaseValidationType<BooleanSchema> {
  t: 'boolean';
  rules?: ProcessRules<BooleanTypeRules>[];
}
