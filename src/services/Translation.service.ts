import { AbstractBaseService } from './provider/AbstractBaseService';
import { ServicesResolver } from './provider/ServiceResolverClass.ts';
import {
    Language,
    type LocalizedText,
    type TextDirection,
} from '../models/Language';
import { LocalStorageService } from './LocalStorage.service.ts';
import { WindowService } from './Window.service.ts';
import enTranslations from '../assets/locales/en.json';
import heTranslations from '../assets/locales/he.json';

interface Translations {
    [key: string]: string;
}

export type TranslationParams = Record<string, string | number>;

const LANGUAGE_STORAGE_KEY = 'origami-language';

export class TranslationService extends AbstractBaseService {
    private translations: Record<Language, Translations> = {
        [Language.English]: enTranslations,
        [Language.Hebrew]: heTranslations,
    };

    constructor(servicesResolver: ServicesResolver) {
        super(servicesResolver);
    }

    private get localStorageService(): LocalStorageService {
        return this.servicesResolver.getService(LocalStorageService);
    }

    private get windowService(): WindowService {
        return this.servicesResolver.getService(WindowService);
    }

    /**
     * Translate a key to the specified language
     * @param key - Translation key
     * @param lang - Target language
     * @param params - Values for `{name}` placeholders in the translation
     * @returns Translated string or the key itself if translation not found
     */
    public t(key: string, lang: Language, params?: TranslationParams): string {
        const translation = this.translations[lang]?.[key] ?? key;
        if (!params) {
            return translation;
        }
        return translation.replace(/\{(\w+)\}/g, (placeholder, name) =>
            name in params ? String(params[name]) : placeholder
        );
    }

    /**
     * Pick the given language from a localized content text
     */
    public tl(text: LocalizedText, lang: Language): string {
        return text[lang];
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
     * Get all translation keys of a language
     */
    public getTranslationKeys(lang: Language): string[] {
        return Object.keys(this.translations[lang]);
    }

    /**
     * Get all available languages
     */
    public getAvailableLanguages(): Language[] {
        return [Language.English, Language.Hebrew];
    }

    /**
     * Hebrew is RTL (right-to-left), English is LTR (left-to-right)
     */
    public getDirection(lang: Language): TextDirection {
        return lang === Language.Hebrew ? 'rtl' : 'ltr';
    }

    /**
     * The language the language switch moves to
     */
    public getNextLanguage(lang: Language): Language {
        return lang === Language.Hebrew ? Language.English : Language.Hebrew;
    }

    /**
     * The language to start with: the saved one, else the browser language
     * when it is supported, else English
     */
    public resolveInitialLanguage(): Language {
        const saved = this.localStorageService.getItem(LANGUAGE_STORAGE_KEY);
        if (this.isSupportedLanguage(saved)) {
            return saved;
        }
        const browserLanguage = (
            this.windowService.window.navigator?.language ?? ''
        )
            .slice(0, 2)
            .toLowerCase();
        if (this.isSupportedLanguage(browserLanguage)) {
            return browserLanguage;
        }
        return Language.English;
    }

    public saveLanguage(lang: Language): void {
        this.localStorageService.setItem(LANGUAGE_STORAGE_KEY, lang);
    }

    private isSupportedLanguage(value: unknown): value is Language {
        return this.getAvailableLanguages().includes(value as Language);
    }
}
