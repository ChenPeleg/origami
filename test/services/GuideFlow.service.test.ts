import { ServicesTestBed } from '../providers/ServicesTestBed.ts';
import { GuideFlowService } from '../../src/services/GuideFlow.service.ts';
import { GuidesService } from '../../src/services/Guides.service.ts';
import type { Guide } from '../../src/models/Guide.ts';
import { beforeEach, describe, it, expect } from 'vitest';

describe('GuideFlow service', () => {
    let service: GuideFlowService;
    let cup: Guide; // 5 steps

    beforeEach(() => {
        const testBed = new ServicesTestBed([]);
        service = testBed.getServiceToTest(GuideFlowService);
        cup = testBed.getServiceToTest(GuidesService).getGuideById('cup')!;
    });

    describe('paths', () => {
        it('should build every route path', () => {
            expect(service.paths.catalog()).toBe('/');
            expect(service.paths.search()).toBe('/search');
            expect(service.paths.guide('cup')).toBe('/guide/cup');
            expect(service.paths.step('cup', 3)).toBe('/guide/cup/step/3');
            expect(service.paths.done('cup')).toBe('/guide/cup/done');
        });
    });

    describe('clampStep', () => {
        it('should keep a valid step', () => {
            expect(service.clampStep(cup, '3')).toBe(3);
        });

        it('should clamp to the first and last step', () => {
            expect(service.clampStep(cup, '0')).toBe(1);
            expect(service.clampStep(cup, '-4')).toBe(1);
            expect(service.clampStep(cup, '99')).toBe(5);
        });

        it('should fall back to step 1 for a value that is not a number', () => {
            expect(service.clampStep(cup, 'abc')).toBe(1);
            expect(service.clampStep(cup, undefined)).toBe(1);
        });
    });

    describe('getStepView', () => {
        it('should have no previous path on the first step', () => {
            const view = service.getStepView(cup, 1);

            expect(view.number).toBe(1);
            expect(view.total).toBe(5);
            expect(view.step).toBe(cup.steps[0]);
            expect(view.prevPath).toBeNull();
            expect(view.nextPath).toBe('/guide/cup/step/2');
            expect(view.isLast).toBe(false);
        });

        it('should link both ways on a middle step', () => {
            const view = service.getStepView(cup, 3);

            expect(view.prevPath).toBe('/guide/cup/step/2');
            expect(view.nextPath).toBe('/guide/cup/step/4');
        });

        it('should lead to the completed screen after the last step', () => {
            const view = service.getStepView(cup, 5);

            expect(view.isLast).toBe(true);
            expect(view.nextPath).toBe('/guide/cup/done');
        });

        it('should mark the jump items as done, current and todo', () => {
            const view = service.getStepView(cup, 3);

            expect(view.jumpItems.map((item) => item.state)).toEqual([
                'done',
                'done',
                'current',
                'todo',
                'todo',
            ]);
            expect(view.jumpItems[3]).toEqual({
                number: 4,
                path: '/guide/cup/step/4',
                state: 'todo',
            });
        });
    });

    describe('getKeyboardTarget', () => {
        it('should go forward with ArrowRight and back with ArrowLeft in LTR', () => {
            const view = service.getStepView(cup, 3);

            expect(service.getKeyboardTarget('ArrowRight', 'ltr', view)).toBe(
                '/guide/cup/step/4'
            );
            expect(service.getKeyboardTarget('ArrowLeft', 'ltr', view)).toBe(
                '/guide/cup/step/2'
            );
        });

        it('should swap the arrows in RTL', () => {
            const view = service.getStepView(cup, 3);

            expect(service.getKeyboardTarget('ArrowLeft', 'rtl', view)).toBe(
                '/guide/cup/step/4'
            );
            expect(service.getKeyboardTarget('ArrowRight', 'rtl', view)).toBe(
                '/guide/cup/step/2'
            );
        });

        it('should do nothing when going back from the first step', () => {
            const view = service.getStepView(cup, 1);

            expect(
                service.getKeyboardTarget('ArrowLeft', 'ltr', view)
            ).toBeNull();
        });

        it('should finish the guide when going forward from the last step', () => {
            const view = service.getStepView(cup, 5);

            expect(service.getKeyboardTarget('ArrowRight', 'ltr', view)).toBe(
                '/guide/cup/done'
            );
        });

        it('should ignore other keys', () => {
            const view = service.getStepView(cup, 3);

            expect(service.getKeyboardTarget('Enter', 'ltr', view)).toBeNull();
            expect(
                service.getKeyboardTarget('ArrowUp', 'rtl', view)
            ).toBeNull();
        });
    });

    describe('getOverviewActions', () => {
        it('should offer only Start when there is no progress', () => {
            expect(service.getOverviewActions(cup, null)).toEqual({
                primary: { kind: 'start', path: '/guide/cup/step/1', step: 1 },
                restartPath: null,
            });
        });

        it('should offer Continue and Start over when there is progress', () => {
            expect(service.getOverviewActions(cup, 3)).toEqual({
                primary: {
                    kind: 'continue',
                    path: '/guide/cup/step/3',
                    step: 3,
                },
                restartPath: '/guide/cup/step/1',
            });
        });

        it('should clamp a saved step that the guide no longer has', () => {
            expect(service.getOverviewActions(cup, 9).primary.step).toBe(5);
        });
    });
});
