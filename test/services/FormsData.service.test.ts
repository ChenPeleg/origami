import { ServicesTestBed } from '../providers/ServicesTestBed.ts';
import { FormsDataService } from '../../src/services/FormsData.service.ts';
import { ActivityType, FormStatus } from '../../src/models/ActivityApprovalForm.ts';
import type { ActivityForm } from '../../src/models/ActivityApprovalForm.ts';
import { beforeEach, describe, it, expect, vi } from 'vitest';

describe('FormsData service', () => {
    let testBed: ServicesTestBed;
    let service: FormsDataService;

    beforeEach(() => {
        testBed = new ServicesTestBed([]);
        service = testBed.getServiceToTest(FormsDataService);
        service.clearAllForms();
        vi.clearAllMocks();
    });

    describe('getAllForms', () => {
        it('should initialize with default mock forms when storage is empty', () => {
            // When
            const forms = service.getAllForms();

            // Then: seeded with 3 initial forms
            expect(forms).toHaveLength(3);
        });

        it('should return the same forms on subsequent calls without re-initializing', () => {
            // When
            const first = service.getAllForms();
            const second = service.getAllForms();

            // Then
            expect(first).toHaveLength(second.length);
            expect(first[0].id).toBe(second[0].id);
        });
    });

    describe('getFormById', () => {
        it('should return the form with the matching id', () => {
            // Given
            const forms = service.getAllForms();
            const target = forms[0];

            // When
            const result = service.getFormById(target.id);

            // Then
            expect(result).toEqual(target);
        });

        it('should return null when no form matches the given id', () => {
            // When
            const result = service.getFormById('non-existent-id');

            // Then
            expect(result).toBeNull();
        });
    });

    describe('getCurrentForm / setCurrentForm', () => {
        it('should return null when no current form has been set', () => {
            // When
            const result = service.getCurrentForm();

            // Then
            expect(result).toBeNull();
        });

        it('should return the form after it has been set as current', () => {
            // Given
            const forms = service.getAllForms();
            const form = forms[0];

            // When
            service.setCurrentForm(form);
            const result = service.getCurrentForm();

            // Then
            expect(result).toEqual(form);
        });

        it('should clear the current form when null is passed', () => {
            // Given
            const forms = service.getAllForms();
            service.setCurrentForm(forms[0]);

            // When
            service.setCurrentForm(null);

            // Then
            expect(service.getCurrentForm()).toBeNull();
        });
    });

    describe('addForm', () => {
        it('should add a new form with auto-generated id and Draft status', () => {
            // Given
            const formData: Omit<ActivityForm, 'id' | 'createdAt' | 'updatedAt' | 'status'> = {
                title: 'New Activity',
                activityType: ActivityType.Trip,
                startDate: '2026-09-01',
                endDate: '2026-09-05',
                participantCount: 20,
            };

            // When
            const added = service.addForm(formData);

            // Then
            expect(added.id).toBeTruthy();
            expect(added.status).toBe(FormStatus.Draft);
            expect(added.title).toBe('New Activity');
            expect(added.createdAt).toBeTruthy();
            expect(added.updatedAt).toBeTruthy();
        });

        it('should persist the new form so it is returned by getAllForms', () => {
            // Given
            const initialCount = service.getAllForms().length;

            // When
            service.addForm({
                title: 'Extra Form',
                activityType: ActivityType.SummerCamp,
                startDate: '2026-10-01',
                endDate: '2026-10-10',
                participantCount: 50,
            });

            // Then
            expect(service.getAllForms()).toHaveLength(initialCount + 1);
        });
    });

    describe('updateForm', () => {
        it('should update the specified fields of an existing form', () => {
            // Given
            const forms = service.getAllForms();
            const original = forms[0];

            // When
            const updated = service.updateForm(original.id, { title: 'Updated Title' });

            // Then
            expect(updated).not.toBeNull();
            expect(updated!.title).toBe('Updated Title');
            expect(updated!.id).toBe(original.id);
        });

        it('should update the updatedAt timestamp', () => {
            // Given
            const forms = service.getAllForms();
            const original = forms[0];
            const originalUpdatedAt = original.updatedAt;

            // When
            const updated = service.updateForm(original.id, { title: 'Changed' });

            // Then
            expect(updated!.updatedAt).not.toBe(originalUpdatedAt);
        });

        it('should return null when the form id does not exist', () => {
            // When
            const result = service.updateForm('not-a-real-id', { title: 'Ghost' });

            // Then
            expect(result).toBeNull();
        });

        it('should also update the current form when it is the one being updated', () => {
            // Given
            const forms = service.getAllForms();
            const form = forms[0];
            service.setCurrentForm(form);

            // When
            service.updateForm(form.id, { title: 'New Title For Current' });

            // Then
            const current = service.getCurrentForm();
            expect(current!.title).toBe('New Title For Current');
        });
    });

    describe('deleteForm', () => {
        it('should return true and remove the form when it exists', () => {
            // Given
            const forms = service.getAllForms();
            const toDelete = forms[0];
            const initialCount = forms.length;

            // When
            const result = service.deleteForm(toDelete.id);

            // Then
            expect(result).toBe(true);
            expect(service.getAllForms()).toHaveLength(initialCount - 1);
            expect(service.getFormById(toDelete.id)).toBeNull();
        });

        it('should return false when the form id does not exist', () => {
            // When
            const result = service.deleteForm('ghost-id');

            // Then
            expect(result).toBe(false);
        });

        it('should clear the current form when the deleted form is the current one', () => {
            // Given
            const forms = service.getAllForms();
            const form = forms[0];
            service.setCurrentForm(form);

            // When
            service.deleteForm(form.id);

            // Then
            expect(service.getCurrentForm()).toBeNull();
        });

        it('should not clear the current form when a different form is deleted', () => {
            // Given
            const forms = service.getAllForms();
            service.setCurrentForm(forms[0]);

            // When
            service.deleteForm(forms[1].id);

            // Then
            expect(service.getCurrentForm()).toEqual(forms[0]);
        });
    });

    describe('clearAllForms', () => {
        it('should remove all stored forms so getAllForms re-initializes with defaults', () => {
            // Given: add an extra form so state is modified
            service.addForm({
                title: 'Temp',
                activityType: ActivityType.Other,
                startDate: '2026-11-01',
                endDate: '2026-11-02',
                participantCount: 5,
            });

            // When
            service.clearAllForms();

            // Then: after clearing, getAllForms re-seeds with initial data
            const forms = service.getAllForms();
            expect(forms).toHaveLength(3);
        });

        it('should also clear the current form', () => {
            // Given
            const forms = service.getAllForms();
            service.setCurrentForm(forms[0]);

            // When
            service.clearAllForms();

            // Then
            expect(service.getCurrentForm()).toBeNull();
        });
    });
});
