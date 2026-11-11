import type { Guide } from '../../models/Guide';
import { useTranslate } from '../../hooks/useTranslate';
import { GuideFoldDiagram } from './GuideFoldDiagram';

export interface GuideCoverProps {
    guide: Guide;
    className?: string;
}

/**
 * GuideCover is the picture of the finished model, with its localized alt text.
 */
export function GuideCover({ guide, className }: GuideCoverProps) {
    const { tl } = useTranslate();

    return (
        <GuideFoldDiagram
            diagram={guide.cover}
            paperColor={guide.paperColor}
            flapColor={guide.flapColor}
            label={tl(guide.coverAlt)}
            className={className}
        />
    );
}
