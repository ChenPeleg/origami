import { AppButton } from '../../common';
import { useLanguage } from '../../hooks/useLanguage';
import { useTranslate } from '../../hooks/useTranslate';

/**
 * LayoutNavbarLanguageToggle switches between Hebrew and English.
 * The button shows the name of the other language, in that language.
 */
export function LayoutNavbarLanguageToggle() {
    const { nextLanguage, toggleLanguage } = useLanguage();
    const { t } = useTranslate();

    return (
        <AppButton
            type="button"
            variant="secondary"
            size="sm"
            lang={nextLanguage}
            aria-label={t('שפה_החלפה_תווית')}
            onClick={toggleLanguage}
        >
            {t('שפה_החלפה_כפתור')}
        </AppButton>
    );
}
