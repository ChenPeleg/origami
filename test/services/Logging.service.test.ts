import { ServicesTestBed } from '../providers/ServicesTestBed.ts';
import { LoggingService } from '../../src/services/Logging.service.ts';
import { LocalStorageService } from '../../src/services/LocalStorage.service.ts';
import { beforeEach, describe, it, expect, vi } from 'vitest';

const SILENT_LOG_KEY = 'app_silent_logs';

describe('Logging service', () => {
    let testBed: ServicesTestBed;
    let service: LoggingService;
    let lsService: LocalStorageService;

    beforeEach(() => {
        localStorage.clear();
        testBed = new ServicesTestBed([]);
        service = testBed.getServiceToTest(LoggingService);
        lsService = testBed.getServiceToTest(LocalStorageService);
        vi.clearAllMocks();
    });

    describe('log', () => {
        it('should call console.log with the provided arguments', () => {
            // Given
            const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

            // When
            service.log('hello', 'world');

            // Then
            expect(consoleSpy).toHaveBeenCalledWith(['hello', 'world']);

            consoleSpy.mockRestore();
        });
    });

    describe('error', () => {
        it('should call console.error with the provided arguments', () => {
            // Given
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

            // When
            service.error('something went wrong', { code: 500 });

            // Then
            expect(consoleSpy).toHaveBeenCalledWith(['something went wrong', { code: 500 }]);

            consoleSpy.mockRestore();
        });
    });

    describe('silentLog', () => {
        it('should persist the logged data into localStorage', () => {
            // When
            service.silentLog('entry1');

            // Then
            const stored = lsService.getObjectOrNull(SILENT_LOG_KEY) as Array<{ data: unknown[]; timestamp: string }>;
            expect(stored).toHaveLength(1);
            expect(stored[0].data).toEqual(['entry1']);
            expect(stored[0].timestamp).toBeTruthy();
        });

        it('should append each call to the existing log entries', () => {
            // When
            service.silentLog('first');
            service.silentLog('second');

            // Then
            const stored = lsService.getObjectOrNull(SILENT_LOG_KEY) as Array<{ data: unknown[] }>;
            expect(stored).toHaveLength(2);
            expect(stored[0].data).toEqual(['first']);
            expect(stored[1].data).toEqual(['second']);
        });

        it('should support multiple arguments per log call', () => {
            // When
            service.silentLog('msg', { detail: 'extra' }, 42);

            // Then
            const stored = lsService.getObjectOrNull(SILENT_LOG_KEY) as Array<{ data: unknown[] }>;
            expect(stored[0].data).toEqual(['msg', { detail: 'extra' }, 42]);
        });
    });
});
