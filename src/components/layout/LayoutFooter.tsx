import { useTranslate } from '../../hooks/useTranslate';

/**
 * LayoutFooter is the one-line footer below every page.
 */
export function LayoutFooter() {
    const { t } = useTranslate();

    return (
        <footer className="text-muted px-4 pt-[18px] pb-[26px] text-center text-[15px]">
            {t('כותרת_תחתונה')}
        </footer>
    );
}
