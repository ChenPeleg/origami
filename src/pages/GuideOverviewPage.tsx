import { Navigate } from 'react-router';
import { AppPaperScrap } from '../common';
import { useService } from '../services/provider/useService';
import { GuideFlowService } from '../services/GuideFlow.service';
import { GuideProgressService } from '../services/GuideProgress.service';
import { useTranslate } from '../hooks/useTranslate';
import { useGuide } from '../hooks/useGuide';
import { BackLink } from '../components/layout/BackLink';
import { PageHeading } from '../components/layout/PageHeading';
import { GuideCover } from '../components/guide/GuideCover';
import { GuideMeta } from '../components/guide/GuideMeta';
import { RequirementsList } from '../components/guide/RequirementsList';
import { GuideActions } from '../components/guide/GuideActions';

/**
 * Guide Overview Page
 * Shows the finished model, what the user needs, and Start or Continue
 */
const GuideOverviewPage = () => {
    const [flowService, progressService] = useService([
        GuideFlowService,
        GuideProgressService,
    ]);
    const { t, tl } = useTranslate();
    const guide = useGuide();

    if (!guide) {
        return <Navigate to={flowService.paths.catalog()} replace />;
    }

    const actions = flowService.getOverviewActions(
        guide,
        progressService.getResumeStep(guide.id)
    );

    return (
        <>
            <BackLink to={flowService.paths.catalog()}>
                {t('ניווט_כל_המדריכים')}
            </BackLink>
            <div className="grid gap-[30px] md:grid-cols-2 md:items-start md:gap-14">
                <AppPaperScrap
                    tapes={[
                        { pattern: guide.tape, position: 'left' },
                        { pattern: 'bands', position: 'right' },
                    ]}
                    className="md:motion-safe:-rotate-1"
                >
                    <GuideCover guide={guide} />
                </AppPaperScrap>
                <div>
                    <PageHeading title={tl(guide.name)} />
                    <p className="text-muted mt-2 mb-3.5 max-w-[44ch] text-[20px]">
                        {tl(guide.description)}
                    </p>
                    <GuideMeta guide={guide} />
                    <RequirementsList requirementKeys={guide.requirementKeys} />
                    <GuideActions
                        actions={actions}
                        onRestart={() => progressService.restartGuide(guide.id)}
                    />
                </div>
            </div>
        </>
    );
};

export default GuideOverviewPage;
