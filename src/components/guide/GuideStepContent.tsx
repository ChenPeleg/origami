import { useEffect, type ReactElement } from 'react';
import { AppPaperScrap } from '../../common';
import type { Guide } from '../../models/Guide';
import { useService } from '../../services/provider/useService';
import { GuideFlowService } from '../../services/GuideFlow.service';
import { GuideProgressService } from '../../services/GuideProgress.service';
import { useTranslate } from '../../hooks/useTranslate';
import { useStepKeyboardNav } from '../../hooks/useStepKeyboardNav';
import { LayoutBackLink } from '../layout/LayoutBackLink';
import { GuideFoldDiagram } from './GuideFoldDiagram';
import { GuideStepContentHeader } from './GuideStepContentHeader';
import { GuideStepContentInstruction } from './GuideStepContentInstruction';
import { GuideStepContentNavButtons } from './GuideStepContentNavButtons';
import { GuideStepContentFoldLegend } from './GuideStepContentFoldLegend';
import { GuideStepContentJumpNav } from './GuideStepContentJumpNav';

export function GuideStepContent({
    guide,
    stepNumber,
}: {
    guide: Guide;
    stepNumber: number;
}): ReactElement {
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
            <LayoutBackLink to={flowService.paths.guide(guide.id)}>
                {tl(guide.name)}
            </LayoutBackLink>
            <div className="md:mx-auto md:max-w-[980px]">
                <AppPaperScrap
                    tapes={[{ pattern: 'bands', position: 'right' }]}
                >
                    <GuideStepContentHeader
                        stepView={stepView}
                        guideName={tl(guide.name)}
                    />
                    <div className="grid gap-[18px] md:grid-cols-[1.15fr_1fr] md:items-start md:gap-7">
                        <GuideFoldDiagram
                            diagram={stepView.step.diagram}
                            paperColor={guide.paperColor}
                            flapColor={guide.flapColor}
                            label={t('תרשים_קיפול_תיאור', {
                                text: instruction,
                            })}
                        />
                        <div>
                            <GuideStepContentInstruction
                                instruction={instruction}
                                tip={tl(stepView.step.tip)}
                            />
                            <GuideStepContentNavButtons stepView={stepView} />
                            <GuideStepContentFoldLegend />
                        </div>
                    </div>
                </AppPaperScrap>
                <GuideStepContentJumpNav items={stepView.jumpItems} />
            </div>
        </>
    );
}
