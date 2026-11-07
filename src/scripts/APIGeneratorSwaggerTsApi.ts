import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { generateApi } from 'swagger-typescript-api';

const schemaLocation = path.resolve(
    process.cwd(),
    './src/generated/swagger/schema.json'
);
// on some machines need to use the actual IP instead of localhost
const schemaApiUrl = new URL(
    '/api/schema/?format=json',
    'http://localhost:8000'
);

class APIGeneratorSwaggerTsApi {
    async generate() {
        await this.generateFromSchema();
        // await this.splitIntoThreeFiles();
    }
    private log(...args: any[]) {
        console['log'](args);
    }
    private error(...args: any[]) {
        console['error'](args);
    }
    private async getSchema() {
        try {
            const { data } = await axios.get(schemaApiUrl.href);
            return data;
        } catch {
            this.log(
                `Failed to generate schema. check that ${schemaApiUrl} is available`
            );
            process.exit(1);
        }
    }

    async generateFromSchema() {
        const data = await this.getSchema();

        fs.writeFileSync(schemaLocation, JSON.stringify(data, undefined, 2));

        return await generateApi({
            output: path.resolve(process.cwd(), './src/generated'),
            input: schemaLocation,
            addReadonly: true,
            fileName: 'GeneratedApi.ts',
            modular: false,
            typeSuffix: 'Dto',
            enumKeySuffix: 'Dto',
            apiClassName: 'GeneratedApi',
            extractEnums: true,
            generateClient: true,
            unwrapResponseData: false,
            patch: true,
            singleHttpClient: true,
            httpClientType: 'axios',
        });
    }

    async splitIntoThreeFiles() {
        const generatedFilePath = path.resolve(
            process.cwd(),
            './src/generated/Api.generated.ts'
        );

        if (!fs.existsSync(generatedFilePath)) {
            this.error('Generated file not found:', generatedFilePath);
            return;
        }

        const content = fs.readFileSync(generatedFilePath, 'utf-8');

        // Split by finding key markers
        const importTypeMatch = content.indexOf(
            'import type {\n  AxiosInstance'
        );
        const httpClientClassMatch = content.indexOf(
            'export class HttpClient<'
        );
        const httpClientEndMatch = content.indexOf(
            '\n}\n',
            httpClientClassMatch
        );
        const apiClassMatch = content.indexOf('export class GeneratedApi<');

        if (
            importTypeMatch === -1 ||
            httpClientClassMatch === -1 ||
            httpClientEndMatch === -1 ||
            apiClassMatch === -1
        ) {
            this.error('Could not find expected sections in generated file');
            this.log('Debug info:', {
                importTypeMatch,
                httpClientClassMatch,
                httpClientEndMatch,
                apiClassMatch,
            });
            return;
        }

        // Extract the header comment block (11 lines)
        const lines = content.split('\n');
        const header = lines.slice(0, 11).join('\n') + '\n';

        // Find where types actually start (after header and blank line)
        const typesStartLine = 12; // Line after header
        const typesStart = lines.slice(0, typesStartLine).join('\n').length + 1;

        // 1. Extract types (data-contracts.ts)
        const typesContent =
            header +
            '\n' +
            content.substring(typesStart, importTypeMatch).trim() +
            '\n';
        const typesPath = path.resolve(
            process.cwd(),
            './src/generated/data-contracts.ts'
        );
        fs.writeFileSync(typesPath, typesContent);
        this.log('✔ Created data-contracts.ts');

        // 2. Extract HttpClient (http-client.ts)
        let httpClientContent =
            header +
            '\n' +
            content.substring(importTypeMatch, httpClientEndMatch + 3).trim() +
            '\n';

        // Rename HttpClient to GeneratedHttpClient
        httpClientContent = httpClientContent.replace(
            /\bHttpClient\b/g,
            'GeneratedHttpClient'
        );

        const httpClientPath = path.resolve(
            process.cwd(),
            './src/generated/http-client.ts'
        );
        fs.writeFileSync(httpClientPath, httpClientContent);
        this.log('✔ Created http-client.ts');

        // 3. Extract GeneratedApi (Api.ts)
        const typesSection = content.substring(typesStart, importTypeMatch);
        const typeNames = this.extractTypeNames(typesSection);
        const apiImports = `import type { ${typeNames} } from "./data-contracts";\nimport { ContentType, GeneratedHttpClient, RequestParams } from "./http-client";\n\n`;

        let apiContent =
            header +
            '\n' +
            apiImports +
            content.substring(apiClassMatch).trim() +
            '\n';

        // Rename HttpClient to GeneratedHttpClient in Api class
        apiContent = apiContent.replace(
            /\bHttpClient\b/g,
            'GeneratedHttpClient'
        );

        const apiPath = path.resolve(process.cwd(), './src/generated/Api.ts');
        fs.writeFileSync(apiPath, apiContent);
        this.log('✔ Created Api.ts');

        // Clean up the original generated file
        fs.unlinkSync(generatedFilePath);
        this.log('✔ Cleaned up temporary file');
    }

    extractTypeNames(typesContent: string): string {
        const typeNames: string[] = [];
        const exportMatches = typesContent.matchAll(
            /export (?:interface|enum|type) (\w+)/g
        );
        for (const match of exportMatches) {
            typeNames.push(match[1]);
        }
        return typeNames.join(', ');
    }
}

const generator = new APIGeneratorSwaggerTsApi();
generator.generate().then();
