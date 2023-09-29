import type { OpenApiSpecification } from '../openapi/types.js';
import { logError } from '../util/logging.js';

export interface AstClient {
  name: string;
  operations: AstClientOperation[];
}

type HttpMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE';

const httpMethods: Readonly<HttpMethod[]> = [
  'GET',
  'HEAD',
  'POST',
  'PUT',
  'DELETE',
  'CONNECT',
  'OPTIONS',
  'TRACE',
];

export interface AstClientOperation {
  name: string;
  method: HttpMethod;
}

export interface AstSpecification {
  clients: AstClient[];
}

export function createAst(specification: OpenApiSpecification) {
  const taggedClients = new Map<string, AstClient>();

  // Process operations
  for (const path in specification.paths) {
    const pathEntry = specification.paths[path];

    for (const [method, operation] of Object.entries(pathEntry)) {
      const normalizedMethod = method.toUpperCase();
      if (!isValidMethod(normalizedMethod)) {
        logError(
          `Unsupported HTTP method found for operation ${operation.operationId}: ${method}`
        );
        continue;
      }

      const tag = operation.tags?.[0] && normalizeTagName(operation.tags?.[0]);

      if (!tag) {
        logError(
          `Cannot process operation ${operation.operationId}, because it has no tag. Add a tags property to the operation and ensure that the array has at least one element. This element groups it to a specific client.`
        );
        continue;
      }

      let client = taggedClients.get(tag);
      if (!client) {
        client = {
          name: tag,
          operations: [],
        };
        taggedClients.set(tag, client);
      }

      client.operations.push({
        name: operation.operationId,
        method: normalizedMethod,
      });
    }
  }

  console.log(taggedClients);

  // Build a list of required schemas
}

function isValidMethod(method: string): method is HttpMethod {
  return !!(method && httpMethods.find((x) => x === method.toUpperCase()));
}

function normalizeTagName(value: string): string {
  if (!value) return value;
  if (value.length === 1) return value.toUpperCase();
  return value[0].toUpperCase() + value.slice(1);
}
