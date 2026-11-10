import { ServicesTestBed } from '../providers/ServicesTestBed.ts';
import { GuidesService } from '../../src/services/Guides.service.ts';
import { Language } from '../../src/models/Language.ts';
import { beforeEach, describe, it, expect } from 'vitest';

describe('Guides service', () => {
    let service: GuidesService;

    beforeEach(() => {
        service = new ServicesTestBed([]).getServiceToTest(GuidesService);
    });

    describe('getAllGuides', () => {
        it('should return the bundled guides in catalog order', () => {
            expect(service.getAllGuides().map((guide) => guide.id)).toEqual([
                'cup',
                'puppy',
            ]);
        });

        it('should have complete content in every language', () => {
            const languages = [Language.English, Language.Hebrew];
            service.getAllGuides().forEach((guide) => {
                const texts = [
                    guide.name,
                    guide.description,
                    guide.coverAlt,
                    ...guide.steps.flatMap((step) => [
                        step.instruction,
                        step.tip,
                    ]),
                ];
                texts.forEach((text) => {
                    languages.forEach((language) => {
                        expect(text[language].trim()).not.toBe('');
                    });
                });
                expect(guide.steps.length).toBeGreaterThan(0);
            });
        });
    });

    describe('getGuideById', () => {
        it('should return the guide with the matching id', () => {
            expect(service.getGuideById('puppy')?.name.en).toBe('Puppy Face');
        });

        it('should return null for an unknown or missing id', () => {
            expect(service.getGuideById('crane')).toBeNull();
            expect(service.getGuideById(undefined)).toBeNull();
        });
    });

    describe('searchGuides', () => {
        it('should be idle for an empty or blank query', () => {
            expect(service.searchGuides('')).toEqual({
                status: 'idle',
                guides: [],
            });
            expect(service.searchGuides('   ').status).toBe('idle');
        });

        it('should match a part of the name, ignoring case and outer spaces', () => {
            const result = service.searchGuides('  PUP ');

            expect(result.status).toBe('results');
            expect(result.guides.map((guide) => guide.id)).toEqual(['puppy']);
        });

        it('should match the description', () => {
            const result = service.searchGuides('holds water');

            expect(result.guides.map((guide) => guide.id)).toEqual(['cup']);
        });

        it('should match Hebrew text whatever the UI language is', () => {
            const result = service.searchGuides('כוס');

            expect(result.guides.map((guide) => guide.id)).toEqual(['cup']);
        });

        it('should return every guide that matches', () => {
            expect(service.searchGuides('fold').guides).toHaveLength(2);
        });

        it('should be empty when nothing matches', () => {
            expect(service.searchGuides('dragon')).toEqual({
                status: 'empty',
                guides: [],
            });
        });
    });
});
