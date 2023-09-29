import fetch from 'node-fetch';
import type { OpenApiSource } from './open-api-source.js';
import type { OpenApiSpecification } from '../types.js';
import { validateSource } from './util/validation.js';

export class HttpOpenApiSource implements OpenApiSource {
  private readonly url: URL;

  constructor(url: URL | string) {
    if (typeof url === 'string') {
      this.url = new URL(url);
    } else {
      this.url = url;
    }
  }

  async retrieve(): Promise<OpenApiSpecification> {
    const response = await fetch(this.url);

    const json = await response.json();

    if (!validateSource(json)) {
      throw new Error('Invalid specification format');
    }

    return json;
  }
}
