import { ServicesTestBed } from '../providers/ServicesTestBed.ts';
import { VersionService } from '../../src/services/Version.service.ts';
import { beforeEach, describe, it, expect, vi } from 'vitest';

describe('Version service', () => {
    let testBed: ServicesTestBed;
    let service: VersionService;

    beforeEach(() => {
        testBed = new ServicesTestBed([]);
        service = testBed.getServiceToTest(VersionService);
        vi.clearAllMocks();
    });

    describe('getBuildDate', () => {
        it('should return empty strings when VITE_BUILD_EPOC_DATE is not set', () => {
            // Given: no env variable is set (default test environment)
            vi.stubEnv('VITE_BUILD_EPOC_DATE', '');

            // When
            const result = service.getBuildDate();

            // Then
            expect(result).toEqual({ dayName: '', date: '', hour: '' });

            vi.unstubAllEnvs();
        });

        it('should return formatted date parts when VITE_BUILD_EPOC_DATE is a valid epoch timestamp', () => {
            // Given: a specific epoch in ms (2024-01-15 12:00:00 UTC)
            const epoch = new Date('2024-01-15T12:00:00Z').getTime();
            vi.stubEnv('VITE_BUILD_EPOC_DATE', String(epoch));

            // When
            const result = service.getBuildDate();

            // Then
            expect(result.dayName).toBeTruthy();
            expect(result.date).toBeTruthy();
            expect(result.hour).toBeTruthy();

            vi.unstubAllEnvs();
        });

        it('should return date strings formatted using Hebrew locale (he-IL)', () => {
            // Given
            const epoch = new Date('2024-06-01T10:00:00Z').getTime();
            vi.stubEnv('VITE_BUILD_EPOC_DATE', String(epoch));

            // When
            const result = service.getBuildDate();

            // Then: dayName should be a Hebrew weekday name (contains Hebrew characters)
            const hebrewPattern = /[\u05d0-\u05ea]/;
            expect(hebrewPattern.test(result.dayName)).toBe(true);

            vi.unstubAllEnvs();
        });
    });
});
