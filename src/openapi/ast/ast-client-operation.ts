import type { HttpMethod } from './http-method.js';

export interface AstClientOperation {
  name: string;
  method: HttpMethod;
}
