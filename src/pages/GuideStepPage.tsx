import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router';
import { AppPaperScrap } from '../common';
import type { Guide } from '../models/Guide';
import { useService } from '../services/provider/useService';
import { GuideFlowService } from '../services/GuideFlow.service';
import { GuideProgressService } from '../services/GuideProgress.service';
import { useTranslate } from '../hooks/useTranslate';
import { useGuide } from '../hooks/useGuide';
import { useStepKeyboardNav } from '../hooks/useStepKeyboardNav';
import { BackLink } from '../components/layout/BackLink';
import { FoldDiagram } from '../components/guide/FoldDiagram';
import { StepHeader } from '../components/step/StepHeader';
import { StepInstruction } from '../components/step/StepInstruction';
import { StepNavButtons } from '../components/step/StepNavButtons';
import { FoldLegend } from '../components/step/FoldLegend';
import { StepJumpNav } from '../components/step/StepJumpNav';

const GuideStepContent = ({
    guide,
    stepNumber,
}: {
    guide: Guide;
    stepNumber: number;
}) => {
    const [flowService, progressService] = useService([
        GuideFlowService,
        GuideProgressService,
    ]);
    const { t, tl } = useTranslate();
    const stepView = flowService.getStepView(guide, stepNumber);
    const instruction = tl(stepView.step.instruction);

    // Opening a step saves it as the place to continue from
    useEffect(() => {
        progressService.visitStep(guide.id, stepNumber);
    }, [progressService, guide.id, stepNumber]);

    useStepKeyboardNav(stepView);

    return (
        <>
            <BackLink to={flowService.paths.guide(guide.id)}>
                {tl(guide.name)}
            </BackLink>
            <div className="md:mx-auto md:max-w-[980px]">
                <AppPaperScrap
                    tapes={[{ pattern: 'bands', position: 'right' }]}
                >
                    <StepHeader
                        stepView={stepView}
                        guideName={tl(guide.name)}
                    />
                    <div className="grid gap-[18px] md:grid-cols-[1.15fr_1fr] md:items-start md:gap-7">
                        <FoldDiagram
                            diagram={stepView.step.diagram}
                            paperColor={guide.paperColor}
                            flapColor={guide.flapColor}
                            label={t('תרשים_קיפול_תיאור', {
                                text: instruction,
                            })}
                        />
                        <div>
                            <StepInstruction
                                instruction={instruction}
                                tip={tl(stepView.step.tip)}
                            />
                            <StepNavButtons stepView={stepView} />
                            <FoldLegend />
                        </div>
                    </div>
                </AppPaperScrap>
                <StepJumpNav items={stepView.jumpItems} />
            </div>
        </>
    );
};

/**
 * Guide Step Page
 * One folding step: diagram, instruction, Back and Next, and jump links
 */
const GuideStepPage = () => {
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

export default GuideStepPage;
