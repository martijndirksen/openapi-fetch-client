import { FileOpenApiSource } from '../openapi/sources/file-open-api-source.js';
import { HttpOpenApiSource } from '../openapi/sources/http-open-api-source.js';
import type { OpenApiSource } from '../openapi/sources/open-api-source.js';
import { logError } from './logging.js';

type ProgramArguments = {
  source: OpenApiSource;
};

export function parseCliArguments(args: string[]): ProgramArguments {
  if (args.length < 3 || !args[2].length) {
    logError(
      'Please specify a file path or an URL of an OpenAPI specification'
    );
  }

  const entry = args[2];

  if (entry.startsWith('http')) {
    return { source: new HttpOpenApiSource(entry) };
  } else {
    return { source: new FileOpenApiSource(entry) };
  }
}
