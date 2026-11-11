import { useEffect, type ReactElement } from 'react';
import { Link } from 'react-router';
import { AppButton, AppHandNote, AppPaperScrap } from '../../common';
import type { Guide } from '../../models/Guide';
import { useService } from '../../services/provider/useService';
import { GuideFlowService } from '../../services/GuideFlow.service';
import { GuideProgressService } from '../../services/GuideProgress.service';
import { useTranslate } from '../../hooks/useTranslate';
import { LayoutPageHeading } from '../layout/LayoutPageHeading';
import { GuideCover } from './GuideCover';

export function GuideDoneContent({ guide }: { guide: Guide }): ReactElement {
    const [flowService, progressService] = useService([
        GuideFlowService,
        GuideProgressService,
    ]);
    const { t, tl } = useTranslate();

    // Reaching this screen means the guide was folded to the end
    useEffect(() => {
        progressService.completeGuide(guide.id);
    }, [progressService, guide.id]);

    return (
        <div className="mx-auto max-w-[560px] text-center">
            <AppPaperScrap
                tapes={[
                    { pattern: 'stripes', position: 'left' },
                    { pattern: 'dots', position: 'right' },
                ]}
            >
                <LayoutPageHeading title={t('עמוד_סיום_כותרת')} />
                <p className="text-muted mx-auto mt-2 mb-0 max-w-[44ch] text-[20px]">
                    {t('עמוד_סיום_תת_כותרת', { name: tl(guide.name) })}
                </p>
                <GuideCover guide={guide} className="mt-3.5 mb-[18px]" />
                <AppHandNote>{t('עמוד_סיום_פתק')}</AppHandNote>
            </AppPaperScrap>
            <div className="mt-[22px] flex flex-wrap items-center justify-center gap-3.5">
                <AppButton
                    as={Link}
                    to={flowService.paths.catalog()}
                    variant="primary"
                >
                    {t('כפתור_מדריך_אחר')}
                </AppButton>
                <AppButton
                    as={Link}
                    to={flowService.paths.step(guide.id, 1)}
                    variant="secondary"
                >
                    {t('כפתור_לקפל_שוב')}
                </AppButton>
            </div>
        </div>
    );
}
