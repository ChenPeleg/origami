import { AppProgressBar } from '../../common';
import type { StepView } from '../../services/GuideFlow.service';
import { useTranslate } from '../../hooks/useTranslate';
import { LayoutPageHeading } from '../layout/LayoutPageHeading';

export interface GuideStepContentHeaderProps {
    stepView: StepView;
    guideName: string;
}

/**
 * GuideStepContentHeader shows where the user is in the guide:
 * "Step n of N", the guide name and the ruler progress bar.
 */
export function GuideStepContentHeader({
    stepView,
    guideName,
}: GuideStepContentHeaderProps) {
    const { t } = useTranslate();
    const label = t('שלב_מתוך', {
        step: stepView.number,
        total: stepView.total,
    });

    return (
        <>
            <div className="mb-2.5 flex items-baseline justify-between gap-3">
                <LayoutPageHeading title={label} size="step" />
                <span className="text-muted text-[13px] font-semibold tracking-[0.14em] uppercase">
                    {guideName}
                </span>
            </div>
            <AppProgressBar
                value={stepView.number}
                max={stepView.total}
                label={label}
                className="mb-[18px]"
            />
        </>
    );
}
