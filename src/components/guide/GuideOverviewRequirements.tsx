import { useTranslate } from '../../hooks/useTranslate';

export interface GuideOverviewRequirementsProps {
    /** Translation keys of the things the user needs */
    requirementKeys: string[];
}

/**
 * GuideOverviewRequirements is the "What you need" list of a guide.
 */
export function GuideOverviewRequirements({
    requirementKeys,
}: GuideOverviewRequirementsProps) {
    const { t } = useTranslate();

    return (
        <>
            <h2 className="text-muted mt-[30px] text-[13px] font-semibold tracking-[0.14em] uppercase">
                {t('מדריך_מה_צריך')}
            </h2>
            <ul className="mt-[18px] mb-[22px] list-none p-0">
                {requirementKeys.map((key) => (
                    <li
                        key={key}
                        className="border-ink/30 before:bg-teal flex gap-2.5 border-b border-dashed py-2 before:mt-[7px] before:size-3.5 before:flex-none before:[clip-path:polygon(0_0,100%_0,0_100%)]"
                    >
                        {t(key)}
                    </li>
                ))}
            </ul>
        </>
    );
}
