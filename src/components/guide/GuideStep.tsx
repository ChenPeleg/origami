import { Navigate, useParams } from 'react-router';
import { useService } from '../../services/provider/useService';
import { GuideFlowService } from '../../services/GuideFlow.service';
import { useGuide } from '../../hooks/useGuide';
import { GuideStepContent } from './GuideStepContent';

/**
 * Guide Step Page
 * One folding step: diagram, instruction, Back and Next, and jump links
 */
const GuideStep = () => {
    const flowService = useService(GuideFlowService);
    const { stepNumber: rawStep } = useParams<{ stepNumber: string }>();
    const guide = useGuide();

    if (!guide) {
        return <Navigate to={flowService.paths.catalog()} replace />;
    }

    const stepNumber = flowService.clampStep(guide, rawStep);
    if (String(stepNumber) !== rawStep) {
        return (
            <Navigate
                to={flowService.paths.step(guide.id, stepNumber)}
                replace
            />
        );
    }

    return <GuideStepContent guide={guide} stepNumber={stepNumber} />;
};

export default GuideStep;
