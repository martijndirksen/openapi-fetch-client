import type { OpenApiSpecification } from '../types.js';

export interface OpenApiSource {
  retrieve(): Promise<OpenApiSpecification>;
}
