import { ServicesTestBed } from '../providers/ServicesTestBed.ts';
import { ExceptionService } from '../../src/services/Exception.service.ts';
import { beforeEach, describe, it, expect, vi } from 'vitest';

describe('Exception service', () => {
    let testBed: ServicesTestBed;
    let service: ExceptionService;

    beforeEach(() => {
        testBed = new ServicesTestBed([]);
        service = testBed.getServiceToTest(ExceptionService);
        vi.clearAllMocks();
    });

    describe('handleException', () => {
        it('should call console.error with the exception', () => {
            // Given
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            const error = new Error('something failed');

            // When
            service.handleException(error);

            // Then
            expect(consoleSpy).toHaveBeenCalledWith(error);

            consoleSpy.mockRestore();
        });

        it('should handle non-Error exceptions (plain strings)', () => {
            // Given
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

            // When
            service.handleException('plain error string');

            // Then
            expect(consoleSpy).toHaveBeenCalledWith('plain error string');

            consoleSpy.mockRestore();
        });

        it('should handle null or undefined without throwing', () => {
            // Given
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

            // When / Then
            expect(() => service.handleException(null)).not.toThrow();
            expect(() => service.handleException(undefined)).not.toThrow();

            consoleSpy.mockRestore();
        });
    });
});
