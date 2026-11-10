import { AbstractBaseService } from './provider/AbstractBaseService';
import { ServicesResolver } from './provider/ServiceResolverClass.ts';
import type {
    FoldDiagram,
    FoldShape,
    PaperFace,
    Point,
} from '../models/Guide.ts';

/** A paper polygon, ready for `<polygon points>` */
export interface DiagramPaper {
    points: string;
    face: PaperFace;
}

/** A mark drawn on top of the paper, in viewBox units */
export type DiagramMark =
    | { kind: 'valley' | 'mountain'; path: string }
    | { kind: 'arrow' | 'arrowBehind'; shaftPath: string; headPath: string }
    | { kind: 'dot'; cx: number; cy: number; r: number }
    | { kind: 'eye'; cx: number; cy: number; r: number }
    | { kind: 'nose'; cx: number; cy: number; rx: number; ry: number };

export interface DiagramRenderModel {
    viewBox: string;
    paper: DiagramPaper[];
    marks: DiagramMark[];
}

const VIEW_BOX = '0 0 400 300';
const ARROW_HEAD_LENGTH = 13;
const ARROW_HEAD_SPREAD = 0.5;
const DOT_RADIUS = 5;
const EYE_RADIUS_RATIO = 0.045;
const NOSE_RADIUS_X_RATIO = 0.085;
const NOSE_RADIUS_Y_RATIO = 0.06;

/**
 * Service responsible for the geometry of fold diagrams.
 * It turns a diagram description (in paper units) into drawing data
 * (in viewBox units). It returns data, not markup.
 */
export class FoldDiagramService extends AbstractBaseService {
    constructor(servicesResolver: ServicesResolver) {
        super(servicesResolver);
    }

    buildRenderModel(diagram: FoldDiagram): DiagramRenderModel {
        const paper: DiagramPaper[] = [];
        const marks: DiagramMark[] = [];
        diagram.shapes.forEach((shape) => {
            if (shape.kind === 'poly') {
                paper.push({
                    face: shape.face,
                    points: shape.points
                        .map((point) => {
                            const [x, y] = this.project(diagram, point);
                            return `${this.format(x)},${this.format(y)}`;
                        })
                        .join(' '),
                });
            } else {
                marks.push(this.buildMark(diagram, shape));
            }
        });
        return { viewBox: VIEW_BOX, paper, marks };
    }

    private buildMark(
        diagram: FoldDiagram,
        shape: Exclude<FoldShape, { kind: 'poly' }>
    ): DiagramMark {
        switch (shape.kind) {
            case 'valley':
            case 'mountain': {
                const start = this.project(diagram, shape.from);
                const end = this.project(diagram, shape.to);
                return {
                    kind: shape.kind,
                    path: `M${this.formatPoint(start)} L${this.formatPoint(end)}`,
                };
            }
            case 'arrow':
            case 'arrowBehind':
                return {
                    kind: shape.kind,
                    ...this.buildArrow(
                        this.project(diagram, shape.from),
                        this.project(diagram, shape.to),
                        shape.bend
                    ),
                };
            case 'dot': {
                const [cx, cy] = this.project(diagram, shape.at);
                return {
                    kind: 'dot',
                    cx: this.round(cx),
                    cy: this.round(cy),
                    r: DOT_RADIUS,
                };
            }
            case 'eye': {
                const [cx, cy] = this.project(diagram, shape.at);
                return {
                    kind: 'eye',
                    cx: this.round(cx),
                    cy: this.round(cy),
                    r: this.round(diagram.scale * EYE_RADIUS_RATIO),
                };
            }
            case 'nose': {
                const [cx, cy] = this.project(diagram, shape.at);
                return {
                    kind: 'nose',
                    cx: this.round(cx),
                    cy: this.round(cy),
                    rx: this.round(diagram.scale * NOSE_RADIUS_X_RATIO),
                    ry: this.round(diagram.scale * NOSE_RADIUS_Y_RATIO),
                };
            }
        }
    }

    /**
     * A curved arrow: a quadratic curve bent sideways by `bend`,
     * and a two-line head that follows the end of the curve.
     */
    private buildArrow(
        start: Point,
        end: Point,
        bend: number
    ): { shaftPath: string; headPath: string } {
        const middleX = (start[0] + end[0]) / 2;
        const middleY = (start[1] + end[1]) / 2;
        const deltaX = end[0] - start[0];
        const deltaY = end[1] - start[1];
        const control: Point = [
            middleX - deltaY * bend,
            middleY + deltaX * bend,
        ];
        const angle = Math.atan2(end[1] - control[1], end[0] - control[0]);
        const headSide = (offset: number): Point => [
            end[0] - ARROW_HEAD_LENGTH * Math.cos(angle + offset),
            end[1] - ARROW_HEAD_LENGTH * Math.sin(angle + offset),
        ];
        return {
            shaftPath: `M${this.formatPoint(start)} Q${this.formatPoint(control)} ${this.formatPoint(end)}`,
            headPath: `M${this.formatPoint(headSide(-ARROW_HEAD_SPREAD))} L${this.formatPoint(end)} L${this.formatPoint(headSide(ARROW_HEAD_SPREAD))}`,
        };
    }

    /**
     * Paper units to viewBox units. The y axis of the paper points up.
     */
    private project(diagram: FoldDiagram, point: Point): Point {
        return [
            diagram.origin[0] + point[0] * diagram.scale,
            diagram.origin[1] - point[1] * diagram.scale,
        ];
    }

    private format(value: number): string {
        return value.toFixed(1);
    }

    private formatPoint(point: Point): string {
        return `${this.format(point[0])} ${this.format(point[1])}`;
    }

    private round(value: number): number {
        return Number(this.format(value));
    }
}
