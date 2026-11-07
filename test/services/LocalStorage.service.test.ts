import { ServicesTestBed } from '../providers/ServicesTestBed.ts';
import { LocalStorageService } from '../../src/services/LocalStorage.service.ts';
import { beforeEach, describe, it, expect, vi } from 'vitest';

describe('LocalStorage service', () => {
    let testBed: ServicesTestBed;
    let service: LocalStorageService;

    beforeEach(() => {
        testBed = new ServicesTestBed([]);
        service = testBed.getServiceToTest(LocalStorageService);
        vi.clearAllMocks();
    });

    describe('setItem / getItem', () => {
        it('should store and retrieve a string value', () => {
            // Given
            service.setItem('myKey', 'myValue');

            // When
            const result = service.getItem('myKey');

            // Then
            expect(result).toBe('myValue');
        });

        it('should return null for a key that does not exist', () => {
            // When
            const result = service.getItem('nonExistentKey');

            // Then
            expect(result).toBeNull();
        });
    });

    describe('getObjectOrNull', () => {
        it('should return a parsed object when valid JSON is stored', () => {
            // Given
            const obj = { id: 1, name: 'test' };
            service.setItem('objKey', JSON.stringify(obj));

            // When
            const result = service.getObjectOrNull('objKey');

            // Then
            expect(result).toEqual(obj);
        });

        it('should return null when the key does not exist', () => {
            // When
            const result = service.getObjectOrNull('missing');

            // Then
            expect(result).toBeNull();
        });

        it('should return null when the stored value is not valid JSON', () => {
            // Given
            service.setItem('badJson', 'not-json{{{');

            // When
            const result = service.getObjectOrNull('badJson');

            // Then
            expect(result).toBeNull();
        });
    });

    describe('removeItem', () => {
        it('should remove an item so it can no longer be retrieved', () => {
            // Given
            service.setItem('removeMe', 'value');

            // When
            service.removeItem('removeMe');

            // Then
            expect(service.getItem('removeMe')).toBeNull();
        });

        it('should not throw when removing a key that does not exist', () => {
            // When / Then
            expect(() => service.removeItem('doesNotExist')).not.toThrow();
        });
    });
});
