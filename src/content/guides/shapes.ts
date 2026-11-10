import type { FoldShape, PaperFace, Point } from '../../models/Guide';

/** Short builders that keep the guide content files readable. */
export const poly = (points: Point[], face: PaperFace): FoldShape => ({
    kind: 'poly',
    points,
    face,
});
export const valley = (from: Point, to: Point): FoldShape => ({
    kind: 'valley',
    from,
    to,
});
export const mountain = (from: Point, to: Point): FoldShape => ({
    kind: 'mountain',
    from,
    to,
});
export const arrow = (from: Point, to: Point, bend: number): FoldShape => ({
    kind: 'arrow',
    from,
    to,
    bend,
});
export const arrowBehind = (
    from: Point,
    to: Point,
    bend: number
): FoldShape => ({ kind: 'arrowBehind', from, to, bend });
export const dot = (at: Point): FoldShape => ({ kind: 'dot', at });
export const eye = (at: Point): FoldShape => ({ kind: 'eye', at });
export const nose = (at: Point): FoldShape => ({ kind: 'nose', at });

/** The square sheet, standing on one corner. */
export const DIAMOND: Point[] = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];
