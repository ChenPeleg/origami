import { ServicesTestBed } from '../providers/ServicesTestBed.ts';
import { GuideProgressService } from '../../src/services/GuideProgress.service.ts';
import { LocalStorageService } from '../../src/services/LocalStorage.service.ts';
import { beforeEach, describe, it, expect } from 'vitest';

const STORAGE_KEY = 'origami-progress';

describe('GuideProgress service', () => {
    let testBed: ServicesTestBed;
    let service: GuideProgressService;
    let storage: LocalStorageService;

    beforeEach(() => {
        testBed = new ServicesTestBed([]);
        service = testBed.getServiceToTest(GuideProgressService);
        storage = testBed.getServiceToTest(LocalStorageService);
        storage.removeItem(STORAGE_KEY);
    });

    it('should have nothing to resume for a guide that was not started', () => {
        expect(service.getResumeStep('cup')).toBeNull();
        expect(service.getResumeSteps()).toEqual({});
    });

    it('should remember the last visited step of each guide', () => {
        service.visitStep('cup', 2);
        service.visitStep('cup', 3);
        service.visitStep('puppy', 1);

        expect(service.getResumeStep('cup')).toBe(3);
        expect(service.getResumeSteps()).toEqual({ cup: 3, puppy: 1 });
    });

    it('should keep the progress for a new service instance (reopening the app)', () => {
        service.visitStep('cup', 4);

        const reopened = new ServicesTestBed([]).getServiceToTest(
            GuideProgressService
        );

        expect(reopened.getResumeStep('cup')).toBe(4);
    });

    it('should store a versioned record that holds the progress only', () => {
        service.visitStep('cup', 2);

        expect(storage.getObjectOrNull(STORAGE_KEY)).toEqual({
            version: 1,
            guides: { cup: { currentStep: 2 } },
        });
    });

    it('should forget a completed guide and keep the others', () => {
        service.visitStep('cup', 5);
        service.visitStep('puppy', 2);

        service.completeGuide('cup');

        expect(service.getResumeStep('cup')).toBeNull();
        expect(service.getResumeStep('puppy')).toBe(2);
    });

    it('should forget a restarted guide', () => {
        service.visitStep('cup', 3);

        service.restartGuide('cup');

        expect(service.getResumeStep('cup')).toBeNull();
    });

    it('should forget everything on clearAll', () => {
        service.visitStep('cup', 3);
        service.visitStep('puppy', 2);

        service.clearAll();

        expect(service.getResumeSteps()).toEqual({});
    });

    describe('bad stored data', () => {
        it('should ignore text that is not JSON', () => {
            storage.setItem(STORAGE_KEY, 'not json');

            expect(service.getResumeSteps()).toEqual({});
        });

        it('should ignore a record of another schema version', () => {
            storage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    version: 99,
                    guides: { cup: { currentStep: 2 } },
                })
            );

            expect(service.getResumeStep('cup')).toBeNull();
        });

        it('should drop entries with an invalid step and keep the valid ones', () => {
            storage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    version: 1,
                    guides: {
                        cup: { currentStep: 'two' },
                        puppy: { currentStep: 3 },
                        boat: null,
                        crane: { currentStep: 0 },
                    },
                })
            );

            expect(service.getResumeSteps()).toEqual({ puppy: 3 });
        });

        it('should still save after reading bad data', () => {
            storage.setItem(STORAGE_KEY, '[1,2,3]');

            service.visitStep('cup', 1);

            expect(service.getResumeStep('cup')).toBe(1);
        });
    });
});
