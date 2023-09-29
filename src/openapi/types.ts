export interface OpenApiSpecification {
  openapi: string;
  info: {
    title: string;
    version: string;
  };
  paths: {
    [path: string]: {
      [method: string]: {
        operationId: string;
        responses: {
          [statusCode: string]: {
            description: string;
            content: {
              [contentType: string]: {
                schema: {
                  type: string;
                  properties: {
                    [propertyName: string]: {
                      type: string;
                    };
                  };
                };
              };
            };
          };
        };
      };
    };
  };
  components: {
    schemas: {
      [schema: string]: OpenApiSchema;
    };
  };
}

export type OpenApiSchema = OpenApiEnumSchema | OpenApiObjectSchema;

export interface OpenApiObjectSchema {
  type: 'object';
  discriminator?: {
    propertyName: string;
    mapping?: {
      [key: string]: string;
    };
  };
  properties: {
    [propertyName: string]: OpenApiProperty;
  };
}

export type OpenApiPrimitive = 'boolean' | 'number' | 'integer' | 'string';

export type OpenApiProperty =
  | OpenApiPrimitiveProperty
  | OpenApiArrayProperty
  | OpenApiObjectProperty
  | OpenApiEnumProperty;

export interface OpenApiPrimitiveProperty {
  type: OpenApiPrimitive;
  nullable?: boolean;
}

export interface OpenApiArrayProperty {
  type: 'array';
  items: {
    type: OpenApiPrimitive;
    $ref?: string;
  };
  nullable?: boolean;
}

export interface OpenApiObjectProperty {
  allOf: {
    $ref: string;
  }[];
  nullable?: boolean;
}

export interface OpenApiEnumProperty {
  allOf: [
    {
      $ref: string;
    },
  ];
  'x-enumNames': string[];
  nullable?: boolean;
}

export interface OpenApiEnumSchema {
  type: 'integer';
  enum: number[];
  'x-enumNames': string[];
}
