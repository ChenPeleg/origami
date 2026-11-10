import { AppProgressBar } from '../../common';
import type { StepView } from '../../services/GuideFlow.service';
import { useTranslate } from '../../hooks/useTranslate';
import { PageHeading } from '../layout/PageHeading';

export interface StepHeaderProps {
    stepView: StepView;
    guideName: string;
}

/**
 * StepHeader shows where the user is in the guide:
 * "Step n of N", the guide name and the ruler progress bar.
 */
export function StepHeader({ stepView, guideName }: StepHeaderProps) {
    const { t } = useTranslate();
    const label = t('שלב_מתוך', {
        step: stepView.number,
        total: stepView.total,
    });

    return (
        <>
            <div className="mb-2.5 flex items-baseline justify-between gap-3">
                <PageHeading title={label} size="step" />
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
