import { OpenApiSchema } from './types';

function renderEntry(name: string, schema: OpenApiSchema): string | null {
  switch (schema.type) {
    case 'object':
      return renderInterface(name, schema);
    case 'integer':
      return renderEnum(name, schema);
    default:
      return null;
  }
}

export interface IParser<T> {
  parse(schema: T): [string, string];
}

export class OpenApiParser implements ISchemaParser<OpenApi> {}

function getParser(schema: OpenApiSchema): ISchemaParser<OpenApiSchema> {
  switch (schema.type) {
    case 'object':
      return new ObjectParser();
    case 'integer':
      return new EnumParser();
    default:
      throw new Error(`Unknown schema type: ${schema.type}`);
  }
}
