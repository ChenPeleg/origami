import { Link } from 'react-router';
import { useService } from '../../services/provider/useService';
import { GuideFlowService } from '../../services/GuideFlow.service';
import { useTranslate } from '../../hooks/useTranslate';

/**
 * BrandLogo is the app mark and name. It links to the catalog (home).
 */
export function BrandLogo() {
    const flowService = useService(GuideFlowService);
    const { t } = useTranslate();

    return (
        <Link
            to={flowService.paths.catalog()}
            className="font-display me-auto flex min-h-11 items-center gap-2.5 text-[26px] leading-none no-underline"
        >
            <svg
                viewBox="0 0 34 34"
                aria-hidden="true"
                className="block size-[34px]"
            >
                <path d="M3 31V5l26 26z" className="fill-coral" />
                <path d="M3 5h26v26z" className="fill-teal" />
                <path d="M3 5l13 13V5z" className="fill-mustard" />
            </svg>
            <span>{t('מותג_שם')}</span>
        </Link>
    );
}
