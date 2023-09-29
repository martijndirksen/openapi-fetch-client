import { OpenApiSpecification } from '../../types.js';

export function validateSource(input: unknown): input is OpenApiSpecification {
  return !!(
    input &&
    typeof input === 'object' &&
    'openapi' in input &&
    typeof input.openapi === 'string' &&
    input.openapi.match(/3\.0\.\d+/g) &&
    'info' in input &&
    input.info &&
    typeof input.info === 'object' &&
    'title' in input.info &&
    typeof input.info.title === 'string' &&
    !!input.info.title &&
    'version' in input.info &&
    typeof input.info.version === 'string' &&
    !!input.info.version
  );
}
