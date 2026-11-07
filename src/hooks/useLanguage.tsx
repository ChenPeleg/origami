import { useEffect } from 'react';
import { useService } from '../services/provider/useService';
import { TranslationService } from '../services/Translation.service';
import { useGlobalState } from '../stores/GlobalState';
import { Language } from '../models/Language';

/**
 * Helper function to get document direction based on language
 * Hebrew and Arabic are RTL (right-to-left), English is LTR (left-to-right)
 */
const getDirectionForLanguage = (language: Language): 'rtl' | 'ltr' => {
    return language === Language.Hebrew || language === Language.Arabic
        ? 'rtl'
        : 'ltr';
};

/**
 * Hook to manage language switching and document direction
 *
 * This hook provides:
 * - Current language
 * - setLanguage method to switch languages
 * - Automatically sets document direction (rtl for Hebrew/Arabic, ltr for English)
 * - Access to translation service for getting available languages
 *
 * @returns Object containing language, setLanguage method, and available languages
 */
export const useLanguage = () => {
    const translationService = useService(TranslationService);
    const { globalState, setLanguage: setGlobalLanguage } = useGlobalState();

    const currentLanguage: Language = globalState.language;

    /**
     * Set the language and update document direction
     * @param language - The language to switch to
     */
    const setLanguage = (language: Language) => {
        setGlobalLanguage(language);
    };

    // Set initial document direction on mount or when language changes
    useEffect(() => {
        const direction = getDirectionForLanguage(currentLanguage);
        document.documentElement.dir = direction;
        document.documentElement.lang = currentLanguage;
    }, [currentLanguage]);

    /**
     * Get all available languages from the translation service
     */
    const availableLanguages = translationService.getAvailableLanguages();

    return {
        language: currentLanguage,
        setLanguage,
        availableLanguages,
    };
};
