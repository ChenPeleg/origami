import { ServicesTestBed } from '../providers/ServicesTestBed.ts';
import { ApiService } from '../../src/services/Api.service.ts';
import { APIServiceMock } from '../mocks/ApiServiceMock.ts';
import { beforeEach, describe, it, expect, vi } from 'vitest';

/** Thin subclass to expose the protected serializeParams method for testing. */
class TestableApiService extends APIServiceMock {
    public testSerializeParams(params: Record<string, string>) {
        return this.serializeParams(params);
    }
}

describe('Api service', () => {
    let testBed: ServicesTestBed;
    let service: TestableApiService;

    beforeEach(() => {
        testBed = new ServicesTestBed([
            {
                provide: ApiService,
                useClass: TestableApiService,
            },
        ]);
        service = testBed.getServiceToTest(ApiService) as TestableApiService;
        vi.clearAllMocks();
    });

    describe('serializeParams', () => {
        it('should serialize simple key-value pairs to a query string', () => {
            // When
            const result = service.testSerializeParams({ foo: 'bar', baz: 'qux' });

            // Then
            expect(result).toContain('foo=bar');
            expect(result).toContain('baz=qux');
        });

        it('should URL-encode special characters in keys and values', () => {
            // When
            const result = service.testSerializeParams({ 'my key': 'hello world' });

            // Then
            expect(result).toBe('my%20key=hello%20world');
        });

        it('should return an empty string for an empty params object', () => {
            // When
            const result = service.testSerializeParams({});

            // Then
            expect(result).toBe('');
        });
    });

    describe('api getter', () => {
        it('should expose the api namespace of the GeneratedApi client', () => {
            // When / Then
            expect(service.api).toBeDefined();
        });
    });

    describe('auth getter', () => {
        it('should expose the authentication namespace of the GeneratedApi client', () => {
            // When / Then
            expect(service.auth).toBeDefined();
        });
    });
});
