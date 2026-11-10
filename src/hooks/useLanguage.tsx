import { useEffect } from 'react';
import { useService } from '../services/provider/useService';
import { TranslationService } from '../services/Translation.service';
import { PageService } from '../services/Page.service';
import { useGlobalState } from '../stores/GlobalState';
import { Language } from '../models/Language';

/**
 * Hook to manage language switching and document direction
 *
 * This hook provides:
 * - Current language and the language the switch moves to
 * - setLanguage / toggleLanguage, which also save the choice
 * - Automatically sets the document language and direction
 *
 * The rules live in `TranslationService` and `PageService`.
 */
export const useLanguage = () => {
    const [translationService, pageService] = useService([
        TranslationService,
        PageService,
    ]);
    const { globalState, setLanguage: setGlobalLanguage } = useGlobalState();

    const currentLanguage: Language = globalState.language;
    const nextLanguage = translationService.getNextLanguage(currentLanguage);

    const setLanguage = (language: Language) => {
        translationService.saveLanguage(language);
        setGlobalLanguage(language);
    };

    const toggleLanguage = () => setLanguage(nextLanguage);

    // Keep <html lang dir> in sync with the current language
    useEffect(() => {
        pageService.setDocumentLanguage(currentLanguage);
    }, [currentLanguage, pageService]);

    return {
        language: currentLanguage,
        nextLanguage,
        setLanguage,
        toggleLanguage,
        availableLanguages: translationService.getAvailableLanguages(),
    };
};
