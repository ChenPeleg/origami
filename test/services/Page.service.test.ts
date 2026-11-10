import { ServicesTestBed } from '../providers/ServicesTestBed.ts';
import { PageService } from '../../src/services/Page.service.ts';
import { WindowService } from '../../src/services/Window.service.ts';
import { Language } from '../../src/models/Language.ts';
import { beforeEach, describe, it, expect } from 'vitest';

describe('Page service', () => {
    let service: PageService;
    let windowService: WindowService;

    beforeEach(() => {
        const testBed = new ServicesTestBed([]);
        service = testBed.getServiceToTest(PageService);
        windowService = testBed.getServiceToTest(WindowService);
    });

    describe('setTitle', () => {
        it('should set "<heading> – <app name>" in the given language', () => {
            service.setTitle('Paper Cup', Language.English);
            expect(windowService.window.document.title).toBe(
                'Paper Cup – Origami'
            );

            service.setTitle('כוס נייר', Language.Hebrew);
            expect(windowService.window.document.title).toBe(
                'כוס נייר – אוריגמי'
            );
        });
    });

    describe('setDocumentLanguage', () => {
        it('should set the language and direction of the document', () => {
            const root = windowService.window.document.documentElement;

            service.setDocumentLanguage(Language.Hebrew);
            expect(root.lang).toBe('he');
            expect(root.dir).toBe('rtl');

            service.setDocumentLanguage(Language.English);
            expect(root.lang).toBe('en');
            expect(root.dir).toBe('ltr');
        });
    });

    describe('enterPage', () => {
        it('should not ask for focus on the first page load', () => {
            expect(service.enterPage('/')).toBe(false);
        });

        it('should ask for focus after navigating to another page', () => {
            service.enterPage('/');

            expect(service.enterPage('/search')).toBe(true);
            expect(service.enterPage('/guide/cup')).toBe(true);
        });

        it('should not ask for focus when the same page is shown again', () => {
            service.enterPage('/');
            service.enterPage('/search');

            expect(service.enterPage('/search')).toBe(false);
        });
    });
});
