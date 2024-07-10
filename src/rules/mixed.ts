import type { SchemaTypeRules } from './schema';
import type { BaseValidationType } from '../rule';
import type { ProcessRules } from '../utils';
import type { MixedSchema } from 'yup';

export type MixedTypeRules = SchemaTypeRules;

export interface MixedValidationType extends BaseValidationType<MixedSchema> {
  t: 'mixed';
  rules?: ProcessRules<MixedTypeRules>[];
}
