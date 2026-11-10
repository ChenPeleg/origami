import type { MouseEvent } from 'react';
import { useTranslate } from '../../hooks/useTranslate';

export interface SkipLinkProps {
    /** The id of the element that holds the main content */
    targetId: string;
}

/**
 * SkipLink lets keyboard users jump over the navigation.
 * It is visible only while it has focus.
 */
export function SkipLink({ targetId }: SkipLinkProps) {
    const { t } = useTranslate();

    // The app uses hash routing, so the link must not change the URL hash.
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        document.getElementById(targetId)?.focus();
    };

    return (
        <a
            href={`#${targetId}`}
            onClick={handleClick}
            className="border-ink bg-scrap text-ink absolute start-2 -top-[60px] z-30 border-2 px-3.5 py-2 focus:top-2"
        >
            {t('ניווט_דילוג_לתוכן')}
        </a>
    );
}
