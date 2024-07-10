import type { Rule } from './rule';

type RequiredKeys<T> = {
  [K in keyof T]: ({} extends { [P in K]: T[K] } ? never : K)
}[keyof T];

type Simplified<T extends Rule> = {} extends Pick<T, Exclude<RequiredKeys<T>, "t">> ? T['t'] | T : T;

type S<T> = {
  [K in keyof T]: T[K]
} & {};

export type ProcessRules<T> = S<T extends infer U extends Rule ? Simplified<U> : never>;
