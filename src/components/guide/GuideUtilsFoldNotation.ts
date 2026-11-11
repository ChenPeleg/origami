import type { SVGProps } from 'react';

type StrokeProps = Pick<
    SVGProps<SVGPathElement>,
    | 'className'
    | 'strokeWidth'
    | 'strokeDasharray'
    | 'strokeLinecap'
    | 'strokeLinejoin'
>;

const ARROW_STROKE: StrokeProps = {
    className: 'fill-none stroke-coral',
    strokeWidth: 3.4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
};

/**
 * The fold notation, shared by the diagrams and the legend.
 * Every meaning has its own line pattern, so it never depends on color alone.
 */
export const FOLD_STROKES = {
    /** valley fold: dashed teal line */
    valley: {
        className: 'fill-none stroke-teal',
        strokeWidth: 3.2,
        strokeDasharray: '9 6',
    },
    /** mountain fold: dash-dot teal line */
    mountain: {
        className: 'fill-none stroke-teal',
        strokeWidth: 3.2,
        strokeDasharray: '14 5 2 5 2 5',
    },
    /** fold direction: coral arrow */
    arrow: ARROW_STROKE,
    /** fold behind: dotted coral arrow */
    arrowBehind: { ...ARROW_STROKE, strokeDasharray: '1 7' },
} satisfies Record<string, StrokeProps>;
