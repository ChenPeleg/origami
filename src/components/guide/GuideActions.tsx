import { Link } from 'react-router';
import { AppButton } from '../../common';
import type { OverviewActions } from '../../services/GuideFlow.service';
import { useTranslate } from '../../hooks/useTranslate';

export interface GuideActionsProps {
    /** From `GuideFlowService.getOverviewActions` */
    actions: OverviewActions;
    /** Called when the user chooses to start over */
    onRestart: () => void;
}

/**
 * GuideActions are the buttons of the guide overview:
 * "Start folding", or "Continue" and "Start over" when there is saved progress.
 */
export function GuideActions({ actions, onRestart }: GuideActionsProps) {
    const { t } = useTranslate();
    const { primary, restartPath } = actions;

    return (
        <div className="flex flex-wrap items-center gap-3.5">
            <AppButton as={Link} to={primary.path} variant="primary">
                {primary.kind === 'continue'
                    ? t('כפתור_המשך_שלב', { step: primary.step })
                    : t('כפתור_התחל_לקפל')}
            </AppButton>
            {restartPath && (
                <AppButton
                    as={Link}
                    to={restartPath}
                    variant="secondary"
                    onClick={onRestart}
                >
                    {t('כפתור_התחל_מחדש')}
                </AppButton>
            )}
        </div>
    );
}
