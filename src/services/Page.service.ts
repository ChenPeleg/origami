import { AbstractBaseService } from './provider/AbstractBaseService';
import { ServicesResolver } from './provider/ServiceResolverClass.ts';
import { TranslationService } from './Translation.service.ts';
import { WindowService } from './Window.service.ts';
import type { Language } from '../models/Language.ts';

const BRAND_NAME_KEY = 'מותג_שם';

/**
 * Service responsible for page-level browser behaviour:
 * the document title, language and direction, scrolling, and when a new page should take focus.
 */
export class PageService extends AbstractBaseService {
    private lastPath: string | null = null;

    constructor(servicesResolver: ServicesResolver) {
        super(servicesResolver);
    }

    private get windowService(): WindowService {
        return this.servicesResolver.getService(WindowService);
    }

    private get translationService(): TranslationService {
        return this.servicesResolver.getService(TranslationService);
    }

    /**
     * Set the document title to "<heading> – <app name>"
     */
    setTitle(heading: string, language: Language): void {
        const brand = this.translationService.t(BRAND_NAME_KEY, language);
        this.windowService.window.document.title = `${heading} – ${brand}`;
    }

    /**
     * Keep `<html lang dir>` in sync with the chosen language
     */
    setDocumentLanguage(language: Language): void {
        const root = this.windowService.window.document.documentElement;
        root.lang = language;
        root.dir = this.translationService.getDirection(language);
    }

    scrollToTop(): void {
        this.windowService.window.scrollTo(0, 0);
    }

    /**
     * Record that a page is shown.
     * @returns true when the user navigated here from another page, so the
     * page should scroll to the top and move focus to its heading. False on
     * the first page load and when the same page renders again (for example
     * after a language switch), where focus must stay where it is.
     */
    enterPage(path: string): boolean {
        const isNavigation = this.lastPath !== null && this.lastPath !== path;
        this.lastPath = path;
        return isNavigation;
    }
}
