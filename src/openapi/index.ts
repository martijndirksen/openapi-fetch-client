import type { OpenApiSource } from './sources/open-api-source.js';
import { logStart } from '../util/logging.js';

export class OpenApiParser {
  constructor(private readonly source: OpenApiSource) {}

  public async parse(): Promise<void> {
    const specification = await this.source.retrieve();

    logStart(
      `Generating types for ${specification.info.title} (v${specification.info.version})`
    );
  }
}
