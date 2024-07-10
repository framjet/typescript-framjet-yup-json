import { FramJetYupJsonParser } from './parser';
import type { ValidationType, ValidationTypeSchemaType } from './rule';

export * from './parser';
export * from './parsers';
export * from './rule';
export * from './rules';

export function getFramJetYupJsonParser(): FramJetYupJsonParser {
  if (globalThis.__FramJetYupJson__ != null) {
    return globalThis.__FramJetYupJson__;
  }

  return globalThis.__FramJetYupJson__ = new FramJetYupJsonParser();
}

export function parseYupDefinition<T extends ValidationType>(type: T): ValidationTypeSchemaType<T> {
  return getFramJetYupJsonParser().parse(type);
}


declare global {
  // noinspection ES6ConvertVarToLetConst
  // eslint-disable-next-line no-var
  var __FramJetYupJson__: FramJetYupJsonParser;

  interface Window {
    __FramJetYupJson__: FramJetYupJsonParser;
  }
}
