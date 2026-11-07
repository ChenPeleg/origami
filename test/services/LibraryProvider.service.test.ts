import { ServicesTestBed } from '../providers/ServicesTestBed.ts';
import { LibraryProviderService } from '../../src/services/LibraryProvider.service.ts';
import { QueryClient } from '@tanstack/react-query';
import { beforeEach, describe, it, expect, vi } from 'vitest';

describe('LibraryProvider service', () => {
    let testBed: ServicesTestBed;
    let service: LibraryProviderService;

    beforeEach(() => {
        testBed = new ServicesTestBed([]);
        service = testBed.getServiceToTest(LibraryProviderService);
        vi.clearAllMocks();
    });

    describe('queryClient', () => {
        it('should expose a QueryClient instance', () => {
            // When
            const client = service.queryClient;

            // Then
            expect(client).toBeInstanceOf(QueryClient);
        });

        it('should return the same QueryClient instance on repeated access', () => {
            // When
            const first = service.queryClient;
            const second = service.queryClient;

            // Then
            expect(first).toBe(second);
        });
    });
});
