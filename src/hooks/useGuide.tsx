import { useParams } from 'react-router';
import { useService } from '../services/provider/useService';
import { GuidesService } from '../services/Guides.service';
import type { Guide } from '../models/Guide';

/**
 * Hook to get the guide of the current route (`/guide/:guideId/...`)
 * @returns the guide, or null when the id is unknown
 */
export const useGuide = (): Guide | null => {
    const guidesService = useService(GuidesService);
    const { guideId } = useParams<{ guideId: string }>();
    return guidesService.getGuideById(guideId);
};
