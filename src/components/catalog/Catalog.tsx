import { useService } from '../../services/provider/useService';
import { GuidesService } from '../../services/Guides.service';
import { GuideProgressService } from '../../services/GuideProgress.service';
import { useTranslate } from '../../hooks/useTranslate';
import { LayoutPageHeading } from '../layout/LayoutPageHeading';
import { GuideGrid } from '../guide/GuideGrid';

/**
 * Catalog Page
 * Lists all guides, with the saved progress of each
 */
const Catalog = () => {
    const [guidesService, progressService] = useService([
        GuidesService,
        GuideProgressService,
    ]);
    const { t } = useTranslate();

    return (
        <>
            <div className="mb-[34px]">
                <LayoutPageHeading title={t('עמוד_קטלוג_כותרת')} />
                <p className="text-muted mt-2 mb-0 max-w-[44ch] text-[20px]">
                    {t('עמוד_קטלוג_תת_כותרת')}
                </p>
            </div>
            <GuideGrid
                guides={guidesService.getAllGuides()}
                resumeSteps={progressService.getResumeSteps()}
            />
        </>
    );
};

export default Catalog;
