import { useTranslate } from '../../hooks/useTranslate';
import { FOLD_STROKES } from './GuideUtilsFoldNotation';

const SAMPLE_CLASS = 'block h-3 w-11 flex-none';

/**
 * GuideStepContentFoldLegend explains the fold notation used in the diagrams.
 */
export function GuideStepContentFoldLegend() {
    const { t } = useTranslate();

    return (
        <ul className="border-ink/30 text-muted mt-[18px] mb-0 flex list-none flex-wrap gap-x-[18px] gap-y-1.5 border-t border-dashed p-0 pt-3 text-[15px]">
            <li className="flex items-center gap-2">
                <svg
                    viewBox="0 0 44 12"
                    aria-hidden="true"
                    className={SAMPLE_CLASS}
                >
                    <path d="M1 6H43" {...FOLD_STROKES.valley} />
                </svg>
                {t('מקרא_קיפול_עמק')}
            </li>
            <li className="flex items-center gap-2">
                <svg
                    viewBox="0 0 44 12"
                    aria-hidden="true"
                    className={SAMPLE_CLASS}
                >
                    <path d="M1 6H43" {...FOLD_STROKES.mountain} />
                </svg>
                {t('מקרא_קיפול_הר')}
            </li>
            <li className="flex items-center gap-2">
                <svg
                    viewBox="0 0 44 12"
                    aria-hidden="true"
                    className={SAMPLE_CLASS}
                >
                    <path d="M2 6H40M33 1l7 5-7 5" {...FOLD_STROKES.arrow} />
                </svg>
                {t('מקרא_כיוון')}
            </li>
        </ul>
    );
}
