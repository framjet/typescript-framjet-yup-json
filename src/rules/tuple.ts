import type { BaseValidationType, ValidationType } from '../rule';
import type { TupleSchema } from 'yup';

export interface TupleValidationType extends BaseValidationType<TupleSchema> {
  t: 'tuple';
  items: ValidationType[];
}
