# Swagger TypeScript API Generator - Parameters Guide

This document explains each parameter of the `generateApi()` function in simple terms.

## Basic Configuration

### `input` (string, required*)
**What it does:** Path to your Swagger/OpenAPI schema file (JSON or YAML)  
**Example:** `'./src/generated/swagger/schema.json'`  
**Simple explanation:** Tells the tool where to find the API blueprint file.

### `url` (string, required*)
**What it does:** URL to download the Swagger/OpenAPI schema from  
**Example:** `'http://localhost:8000/api/schema/?format=json'`  
**Simple explanation:** Use this instead of `input` if you want to fetch the schema from a website.

### `spec` (object, required*)
**What it does:** The Swagger/OpenAPI schema as a JavaScript object  
**Simple explanation:** Use this if you already have the schema loaded in memory.

**Note:** You must provide ONE of: `input`, `url`, or `spec`.

### `output` (string | false)
**What it does:** Folder where generated files will be saved  
**Default:** `false` (no files written)  
**Example:** `'./src/generated'`  
**Simple explanation:** Where to save the generated TypeScript files. Set to `false` if you only want the content in memory.

### `fileName` (string)
**What it does:** Name of the main generated API file   
**Example:** `'generated.api.ts'`  
**Simple explanation:** What to call the TypeScript file that gets created.

## Code Organization

### `modular` (boolean)
**What it does:** Split code into separate files instead of one big file  
**Default:** `false`  
**Simple explanation:** When `true`, creates separate files for routes, types, and HTTP client. When `false`, puts everything in one file.

### `moduleNameIndex` (number)
**What it does:** Which part of the API path to use for grouping  
**Default:** Not specified  
**Example:** `0` (use first part of path)  
**Simple explanation:** If your API has `/users/...` and `/posts/...`, setting this to `0` groups by "users" and "posts".

### `moduleNameFirstTag` (boolean)
**What it does:** Use the first tag from the schema for grouping  
**Default:** `false`  
**Simple explanation:** Uses the tag (like "Authentication", "Users") from your API documentation to organize code.

## Type Generation

### `typePrefix` (string)
**What it does:** Text to add before every type name  
**Default:** `""` (empty)  
**Example:** `'Generated'` → `GeneratedUser`, `GeneratedPost`  
**Simple explanation:** Helps avoid naming conflicts with your own types.

### `typeSuffix` (string)
**What it does:** Text to add after every type name  
**Default:** `""` (empty)  
**Example:** `'DTO'` → `UserDTO`, `PostDTO`  
**Simple explanation:** Another way to make type names more specific.

### `typeNameSeparator` (string)
**What it does:** Character between prefix, name, and suffix  
**Default:** `""` (empty)  
**Example:** `"_"` with prefix "API" → `API_User` instead of `APIUser`  
**Simple explanation:** Controls spacing in generated type names.

### `enumKeyPrefix` (string)
**What it does:** Text to add before enum values  
**Default:** `""` (empty)  
**Simple explanation:** Makes enum values more unique (e.g., `API_ACTIVE` instead of `ACTIVE`).

### `enumKeySuffix` (string)
**What it does:** Text to add after enum values  
**Default:** `""` (empty)  
**Simple explanation:** Another way to make enum values stand out.

### `generateUnionEnums` (boolean)
**What it does:** Create union types instead of TypeScript enums  
**Default:** `false`  
**Example:** `type Status = "active" | "inactive"` instead of enum  
**Simple explanation:** Modern TypeScript developers often prefer union types over enums.

### `addReadonly` (boolean)
**What it does:** Make all properties readonly  
**Default:** `false`  
**Example:** `readonly name: string;`  
**Simple explanation:** Prevents accidental changes to API data structures.

### `disableFormatTypeNames` (boolean)
**What it does:** Keep original names from schema without formatting  
**Default:** `false`  
**Simple explanation:** When `true`, doesn't convert `user_name` to `UserName`.

## Feature Extraction

### `extractRequestParams` (boolean)
**What it does:** Create separate types for request parameters  
**Default:** `false`  
**Simple explanation:** Creates reusable types for query params, path params, etc.

### `extractRequestBody` (boolean)
**What it does:** Create separate types for request bodies  
**Default:** `false`  
**Simple explanation:** Makes types for the data you send to the API.

### `extractResponseBody` (boolean)
**What it does:** Create separate types for successful responses  
**Default:** `false`  
**Simple explanation:** Makes types for the data you get back from the API.

### `extractResponseError` (boolean)
**What it does:** Create separate types for error responses  
**Default:** `false`  
**Simple explanation:** Makes types for error messages from the API.

### `extractEnums` (boolean)
**What it does:** Pull enum values out into separate declarations  
**Default:** `false`  
**Simple explanation:** Instead of inline values, creates named enum types you can reuse.

## API Client Options

### `httpClientType` (string: "axios" | "fetch")
**What it does:** Choose which HTTP library to use  
**Default:** `"axios"`  
**Simple explanation:** "axios" is a popular HTTP library, "fetch" is built into browsers.

### `singleHttpClient` (boolean)
**What it does:** Allow passing a custom HTTP client to the API class  
**Default:** `false`  
**Simple explanation:** Lets you configure one HTTP client and reuse it everywhere.

### `unwrapResponseData` (boolean)
**What it does:** Extract just the `data` from responses automatically  
**Default:** `false`  
**Simple explanation:** Instead of `response.data.data`, you just get `response.data`.

### `disableThrowOnError` (boolean)
**What it does:** Don't throw exceptions on failed requests  
**Default:** `false`  
**Simple explanation:** When `true`, lets you handle errors manually instead of try/catch.

### `defaultRequestParams` (string)
**What it does:** Parameters to add to every request  
**Default:** `""`  
**Simple explanation:** Like adding headers or credentials to all API calls.

## Response Handling

### `generateResponses` (boolean)
**What it does:** Create detailed response information and types  
**Default:** `false`  
**Simple explanation:** Generates extra info about what each endpoint can return.

### `defaultResponseAsSuccess` (boolean)
**What it does:** Treat "default" responses as successful  
**Default:** `false`  
**Simple explanation:** Some APIs use "default" to mean success, not error.

### `defaultResponseType` (string)
**What it does:** Type to use when response has no schema  
**Default:** `"void"`  
**Example:** Could use `"unknown"` or `"any"`  
**Simple explanation:** What type to use when the API doesn't specify what it returns.

### `successResponseStatusRange` ([number, number])
**What it does:** Range of HTTP status codes considered successful  
**Default:** `[200, 300]`  
**Simple explanation:** 200-299 are success, 300+ are redirects/errors.

## Sorting & Organization

### `sortTypes` (boolean)
**What it does:** Sort type definitions alphabetically  
**Default:** `false`  
**Simple explanation:** Makes generated files easier to read and compare.

### `sortRoutes` (boolean)
**What it does:** Sort API endpoints alphabetically  
**Default:** `false`  
**Simple explanation:** Organizes your API calls in ABC order.

## Advanced Options

### `templates` (string)
**What it does:** Path to custom template files  
**Default:** `""` (use built-in templates)  
**Simple explanation:** Let you customize how the code is generated.

### `patch` (boolean)
**What it does:** Fix small errors in the swagger schema  
**Default:** `false`  
**Simple explanation:** Automatically corrects common mistakes in API definitions.

### `cleanOutput` (boolean)
**What it does:** Delete output folder before generating  
**Default:** `false`  
**Simple explanation:** Ensures you start fresh without old generated files.

### `hooks` (object)
**What it does:** Functions to customize the generation process  
**Default:** `{}`  
**Simple explanation:** Lets you modify names, types, and routes during generation.

### `enumNamesAsValues` (boolean)
**What it does:** Use the enum name as its value  
**Default:** `false`  
**Example:** `Status.Active = "Active"` instead of `Status.Active = "active"`  
**Simple explanation:** Makes enum values match their names exactly.

### `anotherArrayType` (boolean)
**What it does:** Generate arrays as `Array<Type>` instead of `Type[]`  
**Default:** `false`  
**Simple explanation:** Stylistic choice: `Array<User>` vs `User[]`.

### `generateClient` (boolean)
**What it does:** Generate the API client class  
**Default:** `true`  
**Simple explanation:** Creates the class you use to call your API.

### `generateRouteTypes` (boolean)
**What it does:** Generate type definitions for routes  
**Default:** `false`  
**Simple explanation:** Creates types describing each API endpoint.

### `toJS` (boolean)
**What it does:** Convert TypeScript to JavaScript  
**Default:** `false`  
**Simple explanation:** Generates .js files instead of .ts files (with type definitions).

## Authentication

### `authorizationToken` (string)
**What it does:** Token for accessing protected swagger schema  
**Simple explanation:** If your API schema itself requires login, put the token here.

## Debugging

### `debug` (boolean)
**What it does:** Show detailed generation logs  
**Default:** `false`  
**Simple explanation:** Prints extra information to help troubleshoot problems.

### `silent` (boolean)
**What it does:** Only show errors, hide other messages  
**Default:** `false`  
**Simple explanation:** Quiet mode - only tells you when something goes wrong.

## Custom Configuration

### `primitiveTypeConstructs` (object | function)
**What it does:** Customize how basic types are mapped  
**Simple explanation:** Change how "string", "number", etc. are converted to TypeScript.

### `codeGenConstructs` (object | function)
**What it does:** Customize code generation building blocks  
**Simple explanation:** Advanced: change how arrays, objects, enums are written.

### `customTranslator` (class)
**What it does:** Convert TypeScript to another language  
**Simple explanation:** Very advanced: translate generated code to different languages.

### `schemaParsers` (object)
**What it does:** Custom parsers for schema types  
**Simple explanation:** Very advanced: override how the tool reads the API schema.

## Name Fixing

### `fixInvalidTypeNamePrefix` (string)
**What it does:** Prefix for invalid type names  
**Default:** `"Type"`  
**Example:** If name is "123Invalid", becomes "Type123Invalid"  
**Simple explanation:** Fixes names that can't be used in TypeScript.

### `fixInvalidEnumKeyPrefix` (string)
**What it does:** Prefix for invalid enum keys  
**Default:** `"Value"`  
**Simple explanation:** Fixes enum values that aren't valid identifiers.

## Extra Features

### `extraTemplates` (array)
**What it does:** Additional template files to process  
**Default:** `[]`  
**Simple explanation:** Generate extra files beyond the standard API client.

### `extractingOptions` (object)
**What it does:** Fine-tune how types are extracted and named  
**Simple explanation:** Advanced control over the extraction features.

### `compilerTsConfig` (object)
**What it does:** TypeScript compiler options (for --to-js)  
**Simple explanation:** Settings for converting TypeScript to JavaScript.

## Request Configuration

### `requestOptions` (object)
**What it does:** Configuration for fetching the swagger schema (like headers, timeout)  
**Simple explanation:** Options passed to the HTTP request when downloading the schema from a URL.

---

## Common Usage Example

```typescript
await generateApi({
  // Where to get the schema
  input: './schema.json',
  
  // Where to save generated files
  output: './src/generated',
  
  // Basic organization
  fileName: 'api.ts',
  modular: true,  // Separate files
  
  // Make names unique
  typePrefix: 'Generated',
  
  // HTTP client
  httpClientType: 'axios',
  
  // Nice features
  unwrapResponseData: true,  // Simpler responses
  patch: true,  // Fix schema errors
  moduleNameFirstTag: true,  // Group by tags
});
```

---

## Parameters Used in This Project

Based on `src/scripts/APIGeneratorSwaggerTsApi.ts`:

```typescript
{
  output: './src/generated',           // Save to src/generated folder
  input: schemaLocation,                // Read from local schema file
  fileName: 'generated.api.ts',        // Name the file
  typePrefix: 'Generated',             // All types start with "Generated"
  modular: true,                       // Split into multiple files
  moduleNameIndex: 0,                  // Group by first path segment
  moduleNameFirstTag: true,            // Also group by API tags
  unwrapResponseData: true,            // Simplify response structure
  patch: true,                         // Auto-fix schema issues
  httpClientType: 'axios',            // Use axios for HTTP calls
}
```

### What These Settings Mean for Our Project

- **modular: true** - We get separate files:
  - `data-contracts.ts` - All type definitions
  - `*.ts` - One file per API module (e.g., `Authentication.ts`, `Users.ts`)
  - `http-client.ts` - Axios HTTP client wrapper

- **typePrefix: 'Generated'** - All types are prefixed to avoid conflicts:
  - `GeneratedUser` instead of `User`
  - `GeneratedActivityRequest` instead of `ActivityRequest`

- **moduleNameFirstTag: true** - API endpoints are grouped by their OpenAPI tags:
  - If backend has `@extend_schema(tags=['activities'])`, generates `Activities.ts`
  - If backend has `@extend_schema(tags=['authentication'])`, generates `Authentication.ts`

- **unwrapResponseData: true** - Makes response handling simpler:
  - Without: `const user = response.data.data`
  - With: `const user = response.data`

- **patch: true** - Automatically fixes common OpenAPI schema issues so generation doesn't fail

---

## Tips for Using This Tool

1. **Start Simple:** Use just `input`, `output`, and `fileName` first
2. **Add modular:** When your API grows, split into multiple files
3. **Use typePrefix:** Avoid naming conflicts with your own types
4. **Enable unwrapResponseData:** Makes working with responses much easier
5. **Turn on patch:** Helps when your schema has small issues
6. **Use hooks:** For advanced customization of generated code

---

## Related Files in This Project

- **Generator Script:** `src/scripts/APIGeneratorSwaggerTsApi.ts`
- **Generated Output:** `src/generated/` folder
- **Schema Source:** Backend at `http://localhost:8000/api/schema/`
- **NPM Script:** `npm run swagger-codegen` (runs the generator)

