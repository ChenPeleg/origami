import { AbstractBaseService } from './provider/AbstractBaseService';
import { ServicesResolver } from './provider/ServiceResolverClass.ts';
import { Language } from '../models/Language';
import enTranslations from '../assets/locales/en.json';
import heTranslations from '../assets/locales/he.json';
import arTranslations from '../assets/locales/ar.json';

interface Translations {
    [key: string]: string;
}

export class TranslationService extends AbstractBaseService {
    private translations: Record<Language, Translations> = {
        [Language.English]: enTranslations,
        [Language.Hebrew]: heTranslations,
        [Language.Arabic]: arTranslations,
    };

    constructor(servicesResolver: ServicesResolver) {
        super(servicesResolver);
    }

    /**
     * Translate a key to the specified language
     * @param key - Translation key
     * @param lang - Target language (Language.Hebrew | Language.English | Language.Arabic)
     * @returns Translated string or the key itself if translation not found
     */
    public t(key: string, lang: Language): string {
        const translation = this.translations[lang]?.[key];

        // Return translation if found, otherwise return the key itself
        return translation ?? key;
    }

    /**
     * Check if a translation key exists
     * @param key - Translation key to check
     * @param lang - Language to check in
     */
    public hasTranslation(key: string, lang: Language): boolean {
        return key in this.translations[lang];
    }

    /**
     * Get all available languages
     */
    public getAvailableLanguages(): Language[] {
        return [Language.English, Language.Hebrew, Language.Arabic];
    }
}
