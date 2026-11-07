import { AbstractBaseService } from './provider/AbstractBaseService';
import { ServicesResolver } from './provider/ServiceResolverClass.ts';

export class VersionService extends AbstractBaseService {
    constructor(servicesResolver: ServicesResolver) {
        super(servicesResolver);
    }

    private getBuildEpocDate(): string {
        return import.meta.env.VITE_BUILD_EPOC_DATE || 0;
    }

    public getBuildDate() {
        const buildEpoc = this.getBuildEpocDate();
        if (!buildEpoc) {
            return {
                dayName: '',
                date: '',
                hour: '',
            };
        }
        const buildDate = new Date(Number(buildEpoc));
        const dayName = buildDate.toLocaleDateString('he-IL', {
            weekday: 'long',
            timeZone: 'Asia/Jerusalem',
        });
        const date = buildDate.toLocaleDateString('he-IL', {
            timeZone: 'Asia/Jerusalem',
        });
        const hour = buildDate.toLocaleTimeString('he-IL', {
            timeZone: 'Asia/Jerusalem',
        });
        return { dayName, date, hour };
    }
}
