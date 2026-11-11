import { Navigate } from 'react-router';
import { useService } from '../../services/provider/useService';
import { GuideFlowService } from '../../services/GuideFlow.service';
import { useGuide } from '../../hooks/useGuide';
import { GuideDoneContent } from './GuideDoneContent';

/**
 * Guide Done Page
 * The completion screen after the last step
 */
const GuideDone = () => {
    const flowService = useService(GuideFlowService);
    const guide = useGuide();

    if (!guide) {
        return <Navigate to={flowService.paths.catalog()} replace />;
    }

    return <GuideDoneContent guide={guide} />;
};

export default GuideDone;
