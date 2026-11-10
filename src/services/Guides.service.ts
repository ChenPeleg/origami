import { AbstractBaseService } from './provider/AbstractBaseService';
import { ServicesResolver } from './provider/ServiceResolverClass.ts';
import type { Guide } from '../models/Guide.ts';
import { GUIDES } from '../content/guides';

/**
 * - `idle`: nothing was typed yet
 * - `results`: at least one guide matches
 * - `empty`: the query matches no guide
 */
export type GuideSearchStatus = 'idle' | 'results' | 'empty';

export interface GuideSearchResult {
    status: GuideSearchStatus;
    guides: Guide[];
}

/**
 * Service responsible for the guide catalog: listing, lookup and search.
 * The guides are bundled with the app (no network).
 */
export class GuidesService extends AbstractBaseService {
    private readonly guides: Guide[] = GUIDES;

    constructor(servicesResolver: ServicesResolver) {
        super(servicesResolver);
    }

    /**
     * All guides, in catalog order
     */
    getAllGuides(): Guide[] {
        return this.guides;
    }

    getGuideById(id: string | undefined): Guide | null {
        return this.guides.find((guide) => guide.id === id) ?? null;
    }

    /**
     * Case-insensitive substring search over the name and description,
     * in every language (so a Hebrew word finds a guide in the English UI).
     */
    searchGuides(query: string): GuideSearchResult {
        const normalizedQuery = query.trim().toLowerCase();
        if (!normalizedQuery) {
            return { status: 'idle', guides: [] };
        }
        const guides = this.guides.filter((guide) =>
            this.getSearchableText(guide).includes(normalizedQuery)
        );
        return { status: guides.length ? 'results' : 'empty', guides };
    }

    private getSearchableText(guide: Guide): string {
        return [
            ...Object.values(guide.name),
            ...Object.values(guide.description),
        ]
            .join(' ')
            .toLowerCase();
    }
}
