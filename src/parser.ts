import type { Rule, ValidationType, ValidationTypeSchemaType } from './rule';
import { type Schema } from 'yup';
import {
  ArrayValidationTypeParser,
  BooleanValidationTypeParser,
  DateValidationTypeParser,
  MixedValidationTypeParser,
  NumberValidationTypeParser,
  ObjectValidationTypeParser,
  StringValidationTypeParser,
  TupleValidationTypeParser
} from './parsers';

const defaultTypeParsers = {
  array: new ArrayValidationTypeParser(),
  boolean: new BooleanValidationTypeParser(),
  date: new DateValidationTypeParser(),
  mixed: new MixedValidationTypeParser(),
  number: new NumberValidationTypeParser(),
  object: new ObjectValidationTypeParser(),
  string: new StringValidationTypeParser(),
  tuple: new TupleValidationTypeParser()
} as const;

export interface ValidationTypeParser<TValidationType extends ValidationType, TRule extends Rule, TSchema extends Schema> {
  parse(schema: TValidationType): TSchema;

  addCustomValidation<T extends TRule>(name: T['t'], validator: (rule: T, schema: TSchema) => TSchema): void;
}

export type AnyValidationTypeParser = ValidationTypeParser<ValidationType, Rule, Schema>;


export class FramJetYupJsonParser {

  private readonly customValidationTypeParsers = new Map<string, AnyValidationTypeParser>();

  public registerCustomType(typeName: string, parser: AnyValidationTypeParser): void {
    if (typeName in defaultTypeParsers) {
      throw new Error(`Trying to override default type parse "${typeName}"`);
    }

    if (this.customValidationTypeParsers.has(typeName)) {
      throw new Error(`Custom type parse "${typeName}" already exists`);
    }

    this.customValidationTypeParsers.set(typeName, parser);
  }

  public getTypeParser(typeName: string): AnyValidationTypeParser {
    if (typeName in defaultTypeParsers) {
      return defaultTypeParsers[typeName];
    }

    if (this.customValidationTypeParsers.has(typeName)) {
      return this.customValidationTypeParsers.get(typeName);
    }

    throw new Error(`Unknown type parse "${typeName}"`);
  }

  public parse<T extends ValidationType>(type: T) {
    const typeName = type.t;

    switch (typeName) {
      case 'array':
        return defaultTypeParsers.array.parse(type) as ValidationTypeSchemaType<T>;
      case 'boolean':
        return defaultTypeParsers.boolean.parse(type) as ValidationTypeSchemaType<T>;
      case 'date':
        return defaultTypeParsers.date.parse(type) as ValidationTypeSchemaType<T>;
      case 'mixed':
        return defaultTypeParsers.mixed.parse(type) as ValidationTypeSchemaType<T>;
      case 'number':
        return defaultTypeParsers.number.parse(type) as ValidationTypeSchemaType<T>;
      case 'object':
        return defaultTypeParsers.object.parse(type) as ValidationTypeSchemaType<T>;
      case 'string':
        return defaultTypeParsers.string.parse(type) as ValidationTypeSchemaType<T>;
      case 'tuple':
        return defaultTypeParsers.tuple.parse(type) as ValidationTypeSchemaType<T>;
      default:
        return this.parseCustom(type);
    }
  }

  protected parseCustom<T extends ValidationType>(type: T): ValidationTypeSchemaType<T> {
    const customParser = this.customValidationTypeParsers.get(type.t);

    if (!customParser) {
      throw new Error(`Unsupported type ${type.t}`);
    }

    return customParser as never;
  }

}
