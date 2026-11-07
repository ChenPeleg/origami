import { ServicesTestBed } from '../providers/ServicesTestBed.ts';
import { TranslationService } from '../../src/services/Translation.service.ts';
import { Language } from '../../src/models/Language.ts';
import { beforeEach, describe, it, expect, vi } from 'vitest';

describe('Translation service', () => {
    let testBed: ServicesTestBed;
    let service: TranslationService;

    beforeEach(() => {
        testBed = new ServicesTestBed([]);
        service = testBed.getServiceToTest(TranslationService);
        vi.clearAllMocks();
    });

    describe('t (translate)', () => {
        it('should return the English translation for a known key', () => {
            // When
            const result = service.t('ברכה_שלום', Language.English);

            // Then
            expect(result).toBe('Hello');
        });

        it('should return the Hebrew translation for a known key', () => {
            // When
            const result = service.t('ברכה_שלום', Language.Hebrew);

            // Then
            expect(result).toBe('שלום');
        });

        it('should return the Arabic translation for a known key', () => {
            // When
            const result = service.t('ברכה_שלום', Language.Arabic);

            // Then
            expect(result).toBe('مرحبا');
        });

        it('should return the key itself when the translation key does not exist', () => {
            // When
            const result = service.t('non_existent_key', Language.English);

            // Then
            expect(result).toBe('non_existent_key');
        });
    });

    describe('hasTranslation', () => {
        it('should return true for a key that exists in the given language', () => {
            expect(service.hasTranslation('ברכה_שלום', Language.English)).toBe(true);
            expect(service.hasTranslation('ברכה_שלום', Language.Hebrew)).toBe(true);
            expect(service.hasTranslation('ברכה_שלום', Language.Arabic)).toBe(true);
        });

        it('should return false for a key that does not exist', () => {
            expect(service.hasTranslation('missing_key', Language.English)).toBe(false);
            expect(service.hasTranslation('missing_key', Language.Hebrew)).toBe(false);
        });
    });

    describe('getAvailableLanguages', () => {
        it('should return all three supported languages', () => {
            // When
            const languages = service.getAvailableLanguages();

            // Then
            expect(languages).toHaveLength(3);
            expect(languages).toContain(Language.English);
            expect(languages).toContain(Language.Hebrew);
            expect(languages).toContain(Language.Arabic);
        });
    });
});
