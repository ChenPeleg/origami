import type { GuideLevel } from '../../models/Guide';
import { useTranslate } from '../../hooks/useTranslate';

export interface GuideMetaDifficultyDotsProps {
    level: GuideLevel;
}

const LEVELS: GuideLevel[] = [1, 2, 3];

/**
 * GuideMetaDifficultyDots shows the level of a guide as filled dots and as text,
 * so the meaning never depends on the dots alone.
 */
export function GuideMetaDifficultyDots({
    level,
}: GuideMetaDifficultyDotsProps) {
    const { t } = useTranslate();

    return (
        <span className="inline-flex items-center gap-[5px] font-semibold">
            {LEVELS.map((dot) => (
                <span
                    key={dot}
                    aria-hidden="true"
                    data-filled={dot <= level}
                    className={`border-coral size-[11px] rounded-full border-2 ${
                        dot <= level ? 'bg-coral' : ''
                    }`}
                />
            ))}
            <span className="ms-[3px]">{t(`רמה_${level}`)}</span>
        </span>
    );
}
