import type { OpenApiSource } from './sources/open-api-source.js';
import { logStart } from '../util/logging.js';
import type { OpenApiSpecification } from 'src/openapi/types.js';

export class OpenApiParser {
  constructor(private readonly source: OpenApiSource) {}

  public async parse(): Promise<OpenApiSpecification> {
    const specification = await this.source.retrieve();

    logStart(
      `Generating types for ${specification.info.title} (v${specification.info.version})`
    );

    return specification;
  }
}
