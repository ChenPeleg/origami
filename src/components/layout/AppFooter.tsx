import { useTranslate } from '../../hooks/useTranslate';

/**
 * AppFooter is the one-line footer below every page.
 */
export function AppFooter() {
    const { t } = useTranslate();

    return (
        <footer className="text-muted px-4 pt-[18px] pb-[26px] text-center text-[15px]">
            {t('כותרת_תחתונה')}
        </footer>
    );
}
