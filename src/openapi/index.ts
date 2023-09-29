import type { OpenApiSource } from './sources/open-api-source.js';

export class OpenApiParser {
  constructor(private readonly source: OpenApiSource) {}

  public async parse(): Promise<void> {
    const specification = await this.source.retrieve();

    console.log(specification);
  }
}
