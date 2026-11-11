import type { PaperScrapTape } from '../../common';
import type { Guide } from '../../models/Guide';
import { useService } from '../../services/provider/useService';
import { GuideFlowService } from '../../services/GuideFlow.service';
import { GuideGridCard } from './GuideGridCard';

export interface GuideGridProps {
    guides: Guide[];
    /** Saved step per guide id; a guide without an entry was not started */
    resumeSteps: Record<string, number>;
}

// Decoration only: the tilt is on from the desktop breakpoint, and only
// when motion is welcome. The card straightens on hover.
const TILT_BASE =
    'md:motion-safe:transition-transform md:motion-safe:duration-150 md:motion-safe:hover:rotate-0';
const TILT_ODD = `${TILT_BASE} md:motion-safe:-rotate-[1.1deg]`;
const TILT_EVEN = `${TILT_BASE} md:motion-safe:rotate-[0.9deg]`;

/** Alternate between two tapes on the corners and one in the middle. */
function getTapes(guide: Guide, index: number): PaperScrapTape[] {
    return index % 2 === 0
        ? [
              { pattern: guide.tape, position: 'left' },
              { pattern: 'bands', position: 'right' },
          ]
        : [{ pattern: guide.tape, position: 'center' }];
}

/**
 * GuideGrid is the responsive list of guide cards,
 * used by the catalog and by the search results.
 */
export function GuideGrid({ guides, resumeSteps }: GuideGridProps) {
    const flowService = useService(GuideFlowService);

    return (
        <ul className="m-0 grid list-none grid-cols-1 gap-x-[30px] gap-y-[38px] p-0 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] md:gap-x-11 md:gap-y-12">
            {guides.map((guide, index) => (
                <li key={guide.id}>
                    <GuideGridCard
                        guide={guide}
                        to={flowService.paths.guide(guide.id)}
                        resumeStep={resumeSteps[guide.id] ?? null}
                        tapes={getTapes(guide, index)}
                        className={index % 2 === 0 ? TILT_ODD : TILT_EVEN}
                    />
                </li>
            ))}
        </ul>
    );
}
