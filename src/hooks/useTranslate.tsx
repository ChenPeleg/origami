import { useService } from '../services/provider/useService.ts';
import {
    TranslationService,
    type TranslationParams,
} from '../services/Translation.service.ts';
import {
    Language,
    type LocalizedText,
    type TextDirection,
} from '../models/Language';
import { useGlobalState } from '../stores/GlobalState.tsx';

export const useTranslate = () => {
    const translationService = useService(TranslationService);
    const { globalState } = useGlobalState();

    const language: Language = globalState.language;
    const direction: TextDirection = translationService.getDirection(language);
    /** Translate a UI string key, with optional `{name}` parameters */
    const t = (key: string, params?: TranslationParams) =>
        translationService.t(key, language, params);
    /** Pick the current language from a localized content text */
    const tl = (text: LocalizedText) => translationService.tl(text, language);
    return {
        t,
        tl,
        language,
        direction,
    };
};
