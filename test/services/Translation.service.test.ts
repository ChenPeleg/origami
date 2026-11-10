import { ServicesTestBed } from '../providers/ServicesTestBed.ts';
import { TranslationService } from '../../src/services/Translation.service.ts';
import { Language } from '../../src/models/Language.ts';
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';

describe('Translation service', () => {
    let testBed: ServicesTestBed;
    let service: TranslationService;

    beforeEach(() => {
        localStorage.clear();
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

        it('should return the key itself when the translation key does not exist', () => {
            // When
            const result = service.t('non_existent_key', Language.English);

            // Then
            expect(result).toBe('non_existent_key');
        });
    });

    describe('hasTranslation', () => {
        it('should return true for a key that exists in the given language', () => {
            expect(service.hasTranslation('ברכה_שלום', Language.English)).toBe(
                true
            );
            expect(service.hasTranslation('ברכה_שלום', Language.Hebrew)).toBe(
                true
            );
        });

        it('should return false for a key that does not exist', () => {
            expect(
                service.hasTranslation('missing_key', Language.English)
            ).toBe(false);
            expect(service.hasTranslation('missing_key', Language.Hebrew)).toBe(
                false
            );
        });
    });

    describe('t with parameters', () => {
        it('should fill the placeholders of a translation', () => {
            expect(
                service.t('שלב_מתוך', Language.English, { step: 2, total: 5 })
            ).toBe('Step 2 of 5');
            expect(
                service.t('שלב_מתוך', Language.Hebrew, { step: 2, total: 5 })
            ).toBe('שלב 2 מתוך 5');
        });

        it('should leave a placeholder as is when its parameter is missing', () => {
            expect(service.t('שלב_מתוך', Language.English, { step: 2 })).toBe(
                'Step 2 of {total}'
            );
        });
    });

    describe('tl (localized content)', () => {
        it('should pick the text of the given language', () => {
            const text = { en: 'Paper Cup', he: 'כוס נייר' };

            expect(service.tl(text, Language.English)).toBe('Paper Cup');
            expect(service.tl(text, Language.Hebrew)).toBe('כוס נייר');
        });
    });

    describe('getAvailableLanguages', () => {
        it('should return exactly Hebrew and English', () => {
            // When
            const languages = service.getAvailableLanguages();

            // Then
            expect(languages).toHaveLength(2);
            expect(languages).toContain(Language.English);
            expect(languages).toContain(Language.Hebrew);
        });
    });

    describe('key parity', () => {
        it('should have the same keys in Hebrew and English, with no empty text', () => {
            const english = service.getTranslationKeys(Language.English);
            const hebrew = service.getTranslationKeys(Language.Hebrew);

            expect([...english].sort()).toEqual([...hebrew].sort());
            [Language.English, Language.Hebrew].forEach((language) => {
                service.getTranslationKeys(language).forEach((key) => {
                    expect(service.t(key, language).trim()).not.toBe('');
                });
            });
        });
    });

    describe('direction and language switch', () => {
        it('should be RTL for Hebrew and LTR for English', () => {
            expect(service.getDirection(Language.Hebrew)).toBe('rtl');
            expect(service.getDirection(Language.English)).toBe('ltr');
        });

        it('should switch to the other language', () => {
            expect(service.getNextLanguage(Language.English)).toBe(
                Language.Hebrew
            );
            expect(service.getNextLanguage(Language.Hebrew)).toBe(
                Language.English
            );
        });
    });

    describe('resolveInitialLanguage', () => {
        const setBrowserLanguage = (language: string) =>
            vi
                .spyOn(window.navigator, 'language', 'get')
                .mockReturnValue(language);

        afterEach(() => {
            vi.restoreAllMocks();
        });

        it('should use the saved language first', () => {
            setBrowserLanguage('en-US');
            service.saveLanguage(Language.Hebrew);

            expect(service.resolveInitialLanguage()).toBe(Language.Hebrew);
        });

        it('should use the browser language when nothing is saved', () => {
            setBrowserLanguage('he-IL');

            expect(service.resolveInitialLanguage()).toBe(Language.Hebrew);
        });

        it('should fall back to English for an unsupported browser language', () => {
            setBrowserLanguage('fr-FR');

            expect(service.resolveInitialLanguage()).toBe(Language.English);
        });

        it('should ignore a saved value that is not a supported language', () => {
            setBrowserLanguage('en-US');
            localStorage.setItem('origami-language', 'ar');

            expect(service.resolveInitialLanguage()).toBe(Language.English);
        });
    });
});
