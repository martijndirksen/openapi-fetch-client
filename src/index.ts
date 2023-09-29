import { logBox } from './util/logging.js';
import { parseCliArguments } from './util/cli.js';
import { OpenApiParser } from './openapi/index.js';

logBox('openapi-fetch-client');

const args = parseCliArguments(process.argv);

const parser = new OpenApiParser(args.source);

parser.parse();

/*
const specification = await readFile('./openapi.json', 'utf-8');
const enumTemplate = await readFile('./src/templates/enum.mustache', 'utf-8');
const interfaceTemplate = await readFile(
  './src/templates/interface.mustache',
  'utf-8'
);

mustache.parse(enumTemplate);
mustache.parse(interfaceTemplate);

const spec = JSON.parse(specification) as IOpenApiSpecification;

await rimraf('./output');
await mkdir('./output');

for (const [name, schema] of Object.entries(spec.components.schemas)) {
  const rendered = renderEntry(name, schema);

  if (rendered) {
    await writeFile(`./output/${name}.ts`, rendered);
  }
}

function renderEntry(name: string, schema: OpenApiSchema): string | null {
  switch (schema.type) {
    case 'object':
      return renderInterface(name, schema);
    case 'integer':
      return renderEnum(name, schema);
    default:
      return null;
  }
}

function extractNameFromRef(ref: string): string {
  if (!ref.startsWith('#/components/schemas/'))
    throw new Error(`Invalid ref: ${ref}. Expected #/components/schemas/...`);
  return ref.split('/').pop() || '';
}

function isPrimitive(type: string): type is OpenApiPrimitive {
  return ['boolean', 'number', 'integer', 'string'].includes(type);
}

type RenderableProperty = { name: string; type: string; isNullable: boolean };

function getRenderableProperty(
  name: string,
  property: OpenApiProperty
): RenderableProperty {
  if ('type' in property && property.type === 'array') {
    if (property.items.type && isPrimitive(property.items.type)) {
      return {
        name,
        type: `${
          property.items.type === 'integer' ? 'number' : property.items.type
        }[]`,
        isNullable: property.nullable || false,
      };
    }
    if (property.items.$ref) {
      return {
        name,
        type: `${extractNameFromRef(property.items.$ref)}[]`,
        isNullable: property.nullable || false,
      };
    }
  } else if ('type' in property) {
    return {
      name,
      type: property.type === 'integer' ? 'number' : property.type,
      isNullable: property.nullable || false,
    };
  }

  if ('x-enumNames' in property) {
    return {
      name,
      type: extractNameFromRef(property.allOf[0].$ref),
      isNullable: property.nullable || false,
    };
  } else if ('allOf' in property) {
    return {
      name,
      type: extractNameFromRef(property.allOf[0].$ref),
      isNullable: property.nullable || false,
    };
  }

  return {
    name,
    type: 'unknown',
    isNullable: property.nullable || false,
  };
}

function extractImport(property: OpenApiProperty): string | null {
  if ('type' in property && property.type === 'array' && property.items.$ref) {
    return extractNameFromRef(property.items.$ref);
  }

  if ('allOf' in property && property.allOf?.[0].$ref) {
    return extractNameFromRef(property.allOf[0].$ref);
  }

  return null;
}

function renderInterface(name: string, schema: IOpenApiObjectSchema): string {
  const ext = determineExtension('nodenext'); // This will have to be a parameter at some point

  const importTypes = new Set<string>();

  for (const property of Object.values(schema.properties)) {
    const importType = extractImport(property);
    if (importType) importTypes.add(importType);
  }

  const properties = Object.entries(schema.properties).map((x) =>
    getRenderableProperty(x[0], x[1])
  );

  return mustache.render(interfaceTemplate, {
    name,
    imports: [...importTypes]
      .sort()
      .map((x) => ({ name: x, path: `./${x}${ext}` })),
    hasImports: importTypes.size > 0,
    properties,
  });
}

function renderEnum(name: string, schema: IOpenApiEnumSchema): string {
  const entries = schema.enum.map((value, index) => ({
    name: schema['x-enumNames'][index],
    value,
  }));
  return mustache.render(enumTemplate, { name, entries });
}

function determineExtension(moduleResolution: string) {
  switch (moduleResolution) {
    case 'node':
    case 'node16':
    case 'nodenext':
      return '.js';
    case 'classic':
      return '.ts';
    default:
      return '';
  }
}
*/
