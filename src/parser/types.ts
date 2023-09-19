export interface IOpenApiSpecification {
  openapi: string;
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

export type OpenApiSchema = IOpenApiEnumSchema | IOpenApiObjectSchema;

export interface IOpenApiObjectSchema {
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
  | IOpenApiPrimitiveProperty
  | IOpenApiArrayProperty
  | IOpenApiObjectProperty
  | IOpenApiEnumProperty;

export interface IOpenApiPrimitiveProperty {
  type: OpenApiPrimitive;
  nullable?: boolean;
}

export interface IOpenApiArrayProperty {
  type: 'array';
  items: {
    type: OpenApiPrimitive;
    $ref?: string;
  };
  nullable?: boolean;
}

export interface IOpenApiObjectProperty {
  allOf: {
    $ref: string;
  }[];
  nullable?: boolean;
}

export interface IOpenApiEnumProperty {
  allOf: [
    {
      $ref: string;
    }
  ];
  'x-enumNames': string[];
  nullable?: boolean;
}

export interface IOpenApiEnumSchema {
  type: 'integer';
  enum: number[];
  'x-enumNames': string[];
}
