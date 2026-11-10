import type { Guide } from '../../models/Guide';
import { useTranslate } from '../../hooks/useTranslate';
import { DifficultyDots } from './DifficultyDots';

export interface GuideMetaProps {
    guide: Guide;
}

/**
 * GuideMeta lists the facts of a guide: level, sheets of paper, time and step count.
 */
export function GuideMeta({ guide }: GuideMetaProps) {
    const { t } = useTranslate();

    return (
        <ul className="text-muted m-0 flex list-none flex-wrap items-center gap-x-[18px] gap-y-1.5 p-0 text-[16px]">
            <li>
                <DifficultyDots level={guide.level} />
            </li>
            <li>
                {guide.sheets === 1
                    ? t('מדריך_דף_אחד')
                    : t('מדריך_דפים', { count: guide.sheets })}
            </li>
            <li>{t('מדריך_דקות', { count: guide.minutes })}</li>
            <li>{t('מדריך_שלבים', { count: guide.steps.length })}</li>
        </ul>
    );
}
