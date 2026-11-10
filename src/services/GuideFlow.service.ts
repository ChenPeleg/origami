import { AbstractBaseService } from './provider/AbstractBaseService';
import { ServicesResolver } from './provider/ServiceResolverClass.ts';
import type { Guide, GuideStep } from '../models/Guide.ts';
import type { TextDirection } from '../models/Language.ts';

export type JumpItemState = 'done' | 'current' | 'todo';

export interface StepJumpItem {
    number: number;
    path: string;
    state: JumpItemState;
}

/**
 * Everything a step screen needs to know about where it is in the guide
 */
export interface StepView {
    step: GuideStep;
    number: number;
    total: number;
    /** null on the first step */
    prevPath: string | null;
    /** the next step, or the completed screen after the last step */
    nextPath: string;
    isLast: boolean;
    jumpItems: StepJumpItem[];
}

export interface OverviewActions {
    primary: {
        kind: 'start' | 'continue';
        path: string;
        /** the step the primary action opens */
        step: number;
    };
    /** null when there is nothing to restart */
    restartPath: string | null;
}

/**
 * Service responsible for the folding flow: the app's paths and the rules of
 * moving between the steps of a guide. Pure logic, no storage.
 */
export class GuideFlowService extends AbstractBaseService {
    constructor(servicesResolver: ServicesResolver) {
        super(servicesResolver);
    }

    /**
     * The only place where route paths are built
     */
    readonly paths = {
        catalog: (): string => '/',
        search: (): string => '/search',
        guide: (guideId: string): string => `/guide/${guideId}`,
        step: (guideId: string, step: number): string =>
            `/guide/${guideId}/step/${step}`,
        done: (guideId: string): string => `/guide/${guideId}/done`,
    };

    /**
     * Turn the step value of a URL into a valid step number of the guide
     */
    clampStep(guide: Guide, rawStep: string | undefined): number {
        const parsed = parseInt(rawStep ?? '', 10) || 1;
        return Math.min(Math.max(parsed, 1), guide.steps.length);
    }

    getStepView(guide: Guide, stepNumber: number): StepView {
        const total = guide.steps.length;
        const number = Math.min(Math.max(stepNumber, 1), total);
        const isLast = number === total;
        return {
            step: guide.steps[number - 1],
            number,
            total,
            prevPath: number > 1 ? this.paths.step(guide.id, number - 1) : null,
            nextPath: isLast
                ? this.paths.done(guide.id)
                : this.paths.step(guide.id, number + 1),
            isLast,
            jumpItems: guide.steps.map((_, index) => {
                const itemNumber = index + 1;
                return {
                    number: itemNumber,
                    path: this.paths.step(guide.id, itemNumber),
                    state: this.getJumpItemState(itemNumber, number),
                };
            }),
        };
    }

    /**
     * Arrow keys move between steps. "Forward" follows the reading direction:
     * ArrowRight in LTR, ArrowLeft in RTL.
     * @returns the path to open, or null when the key does nothing
     */
    getKeyboardTarget(
        key: string,
        direction: TextDirection,
        stepView: StepView
    ): string | null {
        const forwardKey = direction === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
        const backwardKey = direction === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
        if (key === forwardKey) {
            return stepView.nextPath;
        }
        if (key === backwardKey) {
            return stepView.prevPath;
        }
        return null;
    }

    /**
     * The actions of the guide overview: start, or continue and start over
     */
    getOverviewActions(
        guide: Guide,
        resumeStep: number | null
    ): OverviewActions {
        if (resumeStep === null) {
            return {
                primary: {
                    kind: 'start',
                    path: this.paths.step(guide.id, 1),
                    step: 1,
                },
                restartPath: null,
            };
        }
        const step = Math.min(Math.max(resumeStep, 1), guide.steps.length);
        return {
            primary: {
                kind: 'continue',
                path: this.paths.step(guide.id, step),
                step,
            },
            restartPath: this.paths.step(guide.id, 1),
        };
    }

    private getJumpItemState(
        itemNumber: number,
        currentNumber: number
    ): JumpItemState {
        if (itemNumber === currentNumber) {
            return 'current';
        }
        return itemNumber < currentNumber ? 'done' : 'todo';
    }
}
