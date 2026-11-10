import { AbstractBaseService } from './provider/AbstractBaseService';
import { ServicesResolver } from './provider/ServiceResolverClass.ts';
import { LocalStorageService } from './LocalStorage.service.ts';

const PROGRESS_STORAGE_KEY = 'origami-progress';
const PROGRESS_SCHEMA_VERSION = 1;

interface GuideProgressRecord {
    currentStep: number;
}

interface StoredProgress {
    version: number;
    guides: Record<string, GuideProgressRecord>;
}

/**
 * Service responsible for the saved folding progress of each guide.
 *
 * The stored shape is private and versioned. Callers use domain verbs only,
 * so the shape can grow (statuses, done steps, server save) without touching
 * the components.
 */
export class GuideProgressService extends AbstractBaseService {
    constructor(servicesResolver: ServicesResolver) {
        super(servicesResolver);
    }

    private get localStorage(): LocalStorageService {
        return this.servicesResolver.getService(LocalStorageService);
    }

    /**
     * The step to continue from, or null when the guide was not started
     */
    getResumeStep(guideId: string): number | null {
        return this.read().guides[guideId]?.currentStep ?? null;
    }

    /**
     * The step to continue from, for every guide that has saved progress
     */
    getResumeSteps(): Record<string, number> {
        const steps: Record<string, number> = {};
        Object.entries(this.read().guides).forEach(([guideId, record]) => {
            steps[guideId] = record.currentStep;
        });
        return steps;
    }

    /**
     * Remember the step the user is on
     */
    visitStep(guideId: string, step: number): void {
        const progress = this.read();
        progress.guides[guideId] = { currentStep: step };
        this.write(progress);
    }

    /**
     * The guide was folded to the end: nothing is left to resume
     */
    completeGuide(guideId: string): void {
        this.removeGuide(guideId);
    }

    /**
     * Forget the progress of one guide
     */
    restartGuide(guideId: string): void {
        this.removeGuide(guideId);
    }

    /**
     * Forget the progress of every guide
     */
    clearAll(): void {
        this.localStorage.removeItem(PROGRESS_STORAGE_KEY);
    }

    private removeGuide(guideId: string): void {
        const progress = this.read();
        delete progress.guides[guideId];
        this.write(progress);
    }

    private write(progress: StoredProgress): void {
        this.localStorage.setItem(
            PROGRESS_STORAGE_KEY,
            JSON.stringify(progress)
        );
    }

    /**
     * Read the stored progress, dropping anything that is not valid
     */
    private read(): StoredProgress {
        const empty: StoredProgress = {
            version: PROGRESS_SCHEMA_VERSION,
            guides: {},
        };
        const stored = this.localStorage.getObjectOrNull(PROGRESS_STORAGE_KEY);
        if (
            !stored ||
            typeof stored !== 'object' ||
            stored.version !== PROGRESS_SCHEMA_VERSION ||
            !stored.guides ||
            typeof stored.guides !== 'object'
        ) {
            return empty;
        }
        Object.entries(stored.guides).forEach(([guideId, record]) => {
            const currentStep = (record as GuideProgressRecord | null)
                ?.currentStep;
            if (Number.isInteger(currentStep) && (currentStep as number) >= 1) {
                empty.guides[guideId] = { currentStep: currentStep as number };
            }
        });
        return empty;
    }
}
