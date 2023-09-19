# fetch-openapi-client

The basic principle behind the serialization/deserialization is that we assume the contract (i.e. the OpenAPI specification) is correct and we generate the code based on that. This means that we do not need to validate the contract at runtime. This saves us a lot of code and makes the code easier to read and understand.

Additionally, we generate the schema types only as interfaces and enums, not also as classes. This results in a further reduction in complexity, as there is no need to deal with constructors, inheritance, accidentally using implementations instead of interfaces, etc. The resulting JavaScript is also smaller, as interfaces are erased from the code when transpiling. Unfortunately, this approach has a few caveats:

- You cannot use the `instanceof` operator to see if an object is of a certain type. Instead you should use type narrowing (see [Type Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)). Use differences in object structure to determine the type of an object.
- You cannot use the `new` operator to create an object, as we do not provide classes for the schema. If you prefer the `new` operator, you can create a class that implements the generated interface and use that instead. An alternative is to use a cast. For example: `const myObject = { ... } as MyInterface;`
