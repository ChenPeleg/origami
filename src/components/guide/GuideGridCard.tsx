import { Link } from 'react-router';
import { AppHandNote, AppPaperScrap, type PaperScrapTape } from '../../common';
import type { Guide } from '../../models/Guide';
import { useTranslate } from '../../hooks/useTranslate';
import { LayoutDirectionalArrow } from '../layout/LayoutDirectionalArrow';
import { GuideCover } from './GuideCover';
import { GuideMeta } from './GuideMeta';

export interface GuideGridCardProps {
    guide: Guide;
    /** Where the card links to */
    to: string;
    /** The saved step to continue from, or null when the guide was not started */
    resumeStep: number | null;
    tapes?: PaperScrapTape[];
    className?: string;
}

/**
 * GuideGridCard is one guide in a list: a paper scrap that links to the guide,
 * with its cover, name, description, facts and saved progress.
 */
export function GuideGridCard({
    guide,
    to,
    resumeStep,
    tapes,
    className,
}: GuideGridCardProps) {
    const { t, tl } = useTranslate();

    return (
        <AppPaperScrap
            as={Link}
            to={to}
            tapes={tapes}
            className={['group block h-full no-underline', className || '']
                .filter(Boolean)
                .join(' ')}
        >
            <GuideCover guide={guide} />
            <h2 className="font-display group-hover:text-coral mt-4 mb-1.5 text-[30px] leading-[1.1] font-normal">
                {tl(guide.name)}
            </h2>
            <p className="text-muted mb-3">{tl(guide.description)}</p>
            <GuideMeta guide={guide} />
            {resumeStep !== null && (
                <AppHandNote as="span" size="md" className="mt-3 inline-block">
                    {t('מדריך_המשך_משלב', { step: resumeStep })}{' '}
                    <LayoutDirectionalArrow direction="forward" />
                </AppHandNote>
            )}
        </AppPaperScrap>
    );
}
