import { readFile } from 'node:fs/promises';
import type { OpenApiSource } from './open-api-source.js';
import type { OpenApiSpecification } from '../types.js';
import { validateSource } from './util/validation.js';

export class FileOpenApiSource implements OpenApiSource {
  constructor(
    private readonly path: string,
    private readonly encoding: BufferEncoding = 'utf-8'
  ) {}

  async retrieve(): Promise<OpenApiSpecification> {
    const text = await readFile(this.path, { encoding: this.encoding });
    const json = JSON.parse(text);

    if (!validateSource(json)) {
      throw new Error('Invalid specification format');
    }

    return json;
  }
}
