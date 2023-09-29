import type { AstClient } from './ast-client.js';

export interface AstSpecification {
  clients: AstClient[];
  schemas: {
    interfaces: AstInterface[];
  };
}

export interface AstInterface {
  name: string;
  properties: AstProperty[];
}

export type AstEnum = AstEnumString | AstEnumNumber;

export interface AstEnumString {
  name: string;
  enum: string[];
  enumNames: string[];
}

export interface AstEnumNumber {
  name: string;
  enum: number[];
  enumNames: string[];
}

export interface AstProperty {
  name: string;
  isNullable: boolean;
  isArray: boolean;
  type: AstType;
}

export type AstType = AstPrimitiveType | AstTypeRef;

export interface AstPrimitiveType {
  kind: 'primitive';
  type: 'string' | 'number' | 'boolean';
}

export type AstTypeRef = {
  type: 'ref';
  name: string;
  importName: string;
};
