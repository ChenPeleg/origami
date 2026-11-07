import { useService } from '../services/provider/useService.ts';
import { TranslationService } from '../services/Translation.service.ts';
import { Language } from '../models/Language';
import { useGlobalState } from '../stores/GlobalState.tsx';

export const useTranslate = () => {
    const translationService = useService(TranslationService);
    const { globalState } = useGlobalState();

    const language: Language = globalState.language;
    const t = (key: string) => translationService.t(key, language);
    return {
        t,
        language,
    };
};
