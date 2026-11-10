import { useEffect } from 'react';
import { Link, Navigate } from 'react-router';
import { AppButton, AppHandNote, AppPaperScrap } from '../common';
import type { Guide } from '../models/Guide';
import { useService } from '../services/provider/useService';
import { GuideFlowService } from '../services/GuideFlow.service';
import { GuideProgressService } from '../services/GuideProgress.service';
import { useTranslate } from '../hooks/useTranslate';
import { useGuide } from '../hooks/useGuide';
import { PageHeading } from '../components/layout/PageHeading';
import { GuideCover } from '../components/guide/GuideCover';

const GuideDoneContent = ({ guide }: { guide: Guide }) => {
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
                <PageHeading title={t('עמוד_סיום_כותרת')} />
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
};

/**
 * Guide Done Page
 * The completion screen after the last step
 */
const GuideDonePage = () => {
    const flowService = useService(GuideFlowService);
    const guide = useGuide();

    if (!guide) {
        return <Navigate to={flowService.paths.catalog()} replace />;
    }

    return <GuideDoneContent guide={guide} />;
};

export default GuideDonePage;
