import { useSearchParams } from 'react-router';
import { useService } from '../../services/provider/useService';
import { GuidesService } from '../../services/Guides.service';
import { GuideProgressService } from '../../services/GuideProgress.service';
import { useTranslate } from '../../hooks/useTranslate';
import { LayoutPageHeading } from '../layout/LayoutPageHeading';
import { GuideGrid } from '../guide/GuideGrid';
import { SearchForm } from './SearchForm';
import { SearchEmptyState } from './SearchEmptyState';

const QUERY_PARAM = 'q';

/**
 * Search Page
 * Finds guides while the user types. The query lives in the URL, so it is
 * still there when the user comes back from a guide. It is not saved.
 */
const Search = () => {
    const [guidesService, progressService] = useService([
        GuidesService,
        GuideProgressService,
    ]);
    const { t } = useTranslate();
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get(QUERY_PARAM) ?? '';
    const result = guidesService.searchGuides(query);

    const handleQueryChange = (value: string) => {
        setSearchParams(value ? { [QUERY_PARAM]: value } : {}, {
            replace: true,
        });
    };

    return (
        <>
            <div className="mb-[34px]">
                <LayoutPageHeading title={t('עמוד_חיפוש_כותרת')} />
            </div>
            <SearchForm value={query} onChange={handleQueryChange} />
            <div aria-live="polite">
                {result.status === 'results' ? (
                    <GuideGrid
                        guides={result.guides}
                        resumeSteps={progressService.getResumeSteps()}
                    />
                ) : (
                    <SearchEmptyState
                        message={t(
                            result.status === 'idle'
                                ? 'חיפוש_רמז'
                                : 'חיפוש_אין_תוצאות'
                        )}
                    />
                )}
            </div>
        </>
    );
};

export default Search;
