import { Link } from 'react-router';
import { AppButton } from '../../common';
import type { StepView } from '../../services/GuideFlow.service';
import { useTranslate } from '../../hooks/useTranslate';
import { LayoutDirectionalArrow } from '../layout/LayoutDirectionalArrow';

export interface GuideStepContentNavButtonsProps {
    stepView: StepView;
}

/**
 * GuideStepContentNavButtons are the Back and Next buttons of a folding step.
 * Back is disabled on the first step; Next becomes Finish on the last one.
 */
export function GuideStepContentNavButtons({
    stepView,
}: GuideStepContentNavButtonsProps) {
    const { t } = useTranslate();
    const backContent = (
        <>
            <LayoutDirectionalArrow direction="back" /> {t('כפתור_הקודם')}
        </>
    );

    return (
        <div className="mt-5 flex gap-3.5">
            {stepView.prevPath ? (
                <AppButton
                    as={Link}
                    to={stepView.prevPath}
                    variant="secondary"
                    className="flex-1"
                >
                    {backContent}
                </AppButton>
            ) : (
                <AppButton
                    type="button"
                    variant="secondary"
                    className="flex-1"
                    disabled
                >
                    {backContent}
                </AppButton>
            )}
            <AppButton
                as={Link}
                to={stepView.nextPath}
                variant="primary"
                className="flex-1"
            >
                {stepView.isLast ? t('כפתור_סיום') : t('כפתור_הבא')}{' '}
                <LayoutDirectionalArrow direction="forward" />
            </AppButton>
        </div>
    );
}
