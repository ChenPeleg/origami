import type {
    FoldDiagram as FoldDiagramModel,
    PaperFace,
} from '../../models/Guide';
import { useService } from '../../services/provider/useService';
import {
    FoldDiagramService,
    type DiagramMark,
} from '../../services/FoldDiagram.service';
import { FOLD_STROKES } from './GuideUtilsFoldNotation';

export interface GuideFoldDiagramProps {
    diagram: FoldDiagramModel;
    /** Colored side of the paper */
    paperColor: string;
    /** Colored side of a folded-over flap */
    flapColor: string;
    /** Text alternative of the picture */
    label: string;
    className?: string;
}

const WHITE_SIDE = '#FFFDF8';
const WHITE_SIDE_SHADE = '#EFE8D8';
const INK = '#2B2118';

function renderMark(mark: DiagramMark, index: number) {
    switch (mark.kind) {
        case 'valley':
        case 'mountain':
            return (
                <path key={index} d={mark.path} {...FOLD_STROKES[mark.kind]} />
            );
        case 'arrow':
        case 'arrowBehind':
            return (
                <g key={index}>
                    <path d={mark.shaftPath} {...FOLD_STROKES[mark.kind]} />
                    <path d={mark.headPath} {...FOLD_STROKES.arrow} />
                </g>
            );
        case 'dot':
            return (
                <circle
                    key={index}
                    cx={mark.cx}
                    cy={mark.cy}
                    r={mark.r}
                    className="stroke-coral fill-none"
                    strokeWidth={2.5}
                />
            );
        case 'eye':
            return (
                <circle
                    key={index}
                    cx={mark.cx}
                    cy={mark.cy}
                    r={mark.r}
                    fill={INK}
                />
            );
        case 'nose':
            return (
                <ellipse
                    key={index}
                    cx={mark.cx}
                    cy={mark.cy}
                    rx={mark.rx}
                    ry={mark.ry}
                    fill={INK}
                />
            );
    }
}

/**
 * GuideFoldDiagram draws one fold diagram as an SVG picture on a 4:3 paper-shade
 * background. The geometry comes from `FoldDiagramService`; this component
 * only maps it to SVG elements.
 * Fold diagrams never mirror in RTL: mirroring would change what the fold means.
 */
export function GuideFoldDiagram({
    diagram,
    paperColor,
    flapColor,
    label,
    className,
}: GuideFoldDiagramProps) {
    const foldDiagramService = useService(FoldDiagramService);
    const model = foldDiagramService.buildRenderModel(diagram);

    const faceColors: Record<PaperFace, string> = {
        back: WHITE_SIDE,
        backShade: WHITE_SIDE_SHADE,
        front: paperColor,
        flap: flapColor,
    };

    return (
        <div
            dir="ltr"
            className={[
                'bg-shade aspect-[4/3] overflow-hidden',
                className || '',
            ]
                .filter(Boolean)
                .join(' ')}
        >
            <svg
                viewBox={model.viewBox}
                role="img"
                aria-label={label}
                className="block size-full"
            >
                <g
                    style={{
                        filter: 'drop-shadow(3px 5px 4px rgb(60 35 10 / 0.3))',
                    }}
                >
                    {model.paper.map((paper, index) => (
                        <polygon
                            key={index}
                            points={paper.points}
                            fill={faceColors[paper.face]}
                            stroke="rgb(42 30 18 / 0.4)"
                            strokeWidth={1.2}
                            strokeLinejoin="round"
                        />
                    ))}
                </g>
                {model.marks.map(renderMark)}
            </svg>
        </div>
    );
}
