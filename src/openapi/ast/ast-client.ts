import type { AstClientOperation } from './ast-client-operation.js';

export interface AstClient {
  name: string;
  operations: AstClientOperation[];
}
