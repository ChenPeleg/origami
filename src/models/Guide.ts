import type { LocalizedText } from './Language';

/**
 * Fold geometry. Units: 1 = half the diagonal of the sheet, y points up.
 */
export type Point = [number, number];

export type PaperFace = 'back' | 'backShade' | 'front' | 'flap';

export type FoldShape =
    | { kind: 'poly'; points: Point[]; face: PaperFace }
    | { kind: 'valley' | 'mountain'; from: Point; to: Point }
    | { kind: 'arrow' | 'arrowBehind'; from: Point; to: Point; bend: number }
    | { kind: 'dot' | 'eye' | 'nose'; at: Point };

/**
 * A diagram is a list of shapes with a scale and an origin
 * inside a 400 x 300 viewBox.
 */
export interface FoldDiagram {
    scale: number;
    origin: Point;
    shapes: FoldShape[];
}

export type TapePattern = 'stripes' | 'dots' | 'bands';

export type GuideLevel = 1 | 2 | 3;

export interface GuideStep {
    instruction: LocalizedText;
    tip: LocalizedText;
    diagram: FoldDiagram;
}

export interface Guide {
    id: string;
    name: LocalizedText;
    description: LocalizedText;
    /** Alt text of the finished-model image */
    coverAlt: LocalizedText;
    level: GuideLevel;
    sheets: number;
    minutes: number;
    tape: TapePattern;
    /** Colored side of the paper */
    paperColor: string;
    /** Colored side of a folded-over flap */
    flapColor: string;
    /** Translation keys of the "what you need" list */
    requirementKeys: string[];
    cover: FoldDiagram;
    steps: GuideStep[];
}
