import { ServicesTestBed } from '../providers/ServicesTestBed.ts';
import { FoldDiagramService } from '../../src/services/FoldDiagram.service.ts';
import { GuidesService } from '../../src/services/Guides.service.ts';
import type { Guide } from '../../src/models/Guide.ts';
import { beforeEach, describe, it, expect } from 'vitest';

/**
 * The expected values were taken from the output of the `draw()` function
 * of the HTML mockup (docs/design/demo.html) for the same diagrams.
 */
describe('FoldDiagram service', () => {
    let service: FoldDiagramService;
    let cup: Guide;
    let puppy: Guide;

    beforeEach(() => {
        const testBed = new ServicesTestBed([]);
        service = testBed.getServiceToTest(FoldDiagramService);
        const guidesService = testBed.getServiceToTest(GuidesService);
        cup = guidesService.getGuideById('cup')!;
        puppy = guidesService.getGuideById('puppy')!;
    });

    it('should use the 400 x 300 viewBox', () => {
        expect(service.buildRenderModel(cup.cover).viewBox).toBe('0 0 400 300');
    });

    it('should project paper, a valley fold, a curved arrow and a dot (cup, step 2)', () => {
        const model = service.buildRenderModel(cup.steps[1].diagram);

        expect(model.paper).toEqual([
            { face: 'front', points: '30.0,245.0 370.0,245.0 200.0,75.0' },
        ]);
        expect(model.marks).toEqual([
            { kind: 'valley', path: 'M222.1 262.0 L277.4 128.4' },
            {
                kind: 'arrow',
                shaftPath: 'M358.1 234.8 Q276.0 123.1 138.8 143.0',
                headPath: 'M149.2 135.2 L138.8 143.0 L151.0 147.5',
            },
            { kind: 'dot', cx: 129.6, cy: 145.4, r: 5 },
        ]);
    });

    it('should keep the order of the paper layers and draw a mountain fold and a "behind" arrow (cup, step 5)', () => {
        const model = service.buildRenderModel(cup.steps[4].diagram);

        expect(model.paper).toEqual([
            { face: 'front', points: '104.7,127.3 295.3,127.3 200.0,32.0' },
            {
                face: 'front',
                points: '160.5,262.0 239.5,262.0 295.3,127.3 104.7,127.3',
            },
            { face: 'flap', points: '239.5,262.0 295.3,127.3 104.7,127.3' },
            { face: 'flap', points: '160.5,262.0 104.7,127.3 295.3,127.3' },
            { face: 'back', points: '104.7,127.3 295.3,127.3 200.0,222.5' },
        ]);
        expect(model.marks).toEqual([
            { kind: 'mountain', path: 'M80.4 127.3 L319.6 127.3' },
            {
                kind: 'arrowBehind',
                shaftPath: 'M218.4 43.5 Q337.4 50.9 342.6 170.0',
                headPath: 'M335.9 158.9 L342.6 170.0 L348.3 158.3',
            },
        ]);
    });

    it('should size eyes and nose by the scale of the diagram (puppy cover)', () => {
        const model = service.buildRenderModel(puppy.cover);

        expect(model.paper[0]).toEqual({
            face: 'front',
            points: '167.8,53.0 232.3,53.0 350.5,117.5 238.7,229.3 161.3,229.3 49.5,117.5',
        });
        expect(model.marks).toEqual([
            { kind: 'eye', cx: 148.4, cy: 134.7, r: 9.7 },
            { kind: 'eye', cx: 251.6, cy: 134.7, r: 9.7 },
            { kind: 'nose', cx: 200, cy: 203.5, rx: 18.3, ry: 12.9 },
        ]);
    });

    it('should build every diagram of every guide without invalid numbers', () => {
        [cup, puppy].forEach((guide) => {
            [guide.cover, ...guide.steps.map((step) => step.diagram)].forEach(
                (diagram) => {
                    const model = service.buildRenderModel(diagram);

                    expect(JSON.stringify(model)).not.toMatch(
                        /NaN|null|undefined/
                    );
                    expect(model.paper.length).toBeGreaterThan(0);
                }
            );
        });
    });
});
