import { AbstractBaseService } from './provider/AbstractBaseService';
import { ServicesResolver } from './provider/ServiceResolverClass.ts';
import {
    ActivityType,
    FormStatus,
    type ActivityForm,
} from '../models/ActivityApprovalForm.ts';

const FORMS_STORAGE_KEY = 'activity_approval_forms';
const CURRENT_FORM_STORAGE_KEY = 'activity_approval_current_form';

/**
 * Service responsible for managing activity approval forms
 * Persists data in local storage
 */
export class FormsDataService extends AbstractBaseService {
    constructor(servicesResolver: ServicesResolver) {
        super(servicesResolver);
    }

    /**
     * Get local storage service instance
     */
    private get localStorage() {
        return this.servicesResolver.localStorageService;
    }

    /**
     * Initialize forms with default mock data if storage is empty
     */
    private getInitialForms(): ActivityForm[] {
        return [
            {
                id: '1',
                title: 'Summer Trip to Galilee',
                activityType: ActivityType.Trip,
                startDate: '2026-07-15',
                endDate: '2026-07-20',
                participantCount: 45,
                description:
                    'Five-day hiking and camping trip in northern Israel',
                status: FormStatus.Approved,
                createdAt: '2026-05-01T10:00:00Z',
                updatedAt: '2026-05-03T14:30:00Z',
            },
            {
                id: '2',
                title: 'Summer Camp 2026',
                activityType: ActivityType.SummerCamp,
                startDate: '2026-08-01',
                endDate: '2026-08-15',
                participantCount: 120,
                description: 'Two-week summer camp with educational activities',
                status: FormStatus.Pending,
                createdAt: '2026-05-05T09:15:00Z',
                updatedAt: '2026-05-05T09:15:00Z',
            },
            {
                id: '3',
                title: 'Weekend Workshop',
                activityType: ActivityType.Other,
                startDate: '2026-06-10',
                endDate: '2026-06-12',
                participantCount: 30,
                description: 'Leadership skills workshop',
                status: FormStatus.Draft,
                createdAt: '2026-05-08T16:20:00Z',
                updatedAt: '2026-05-09T11:45:00Z',
            },
        ];
    }

    /**
     * Get all forms from storage
     */
    getAllForms(): ActivityForm[] {
        const forms = this.localStorage.getObjectOrNull(FORMS_STORAGE_KEY);
        if (!forms || !Array.isArray(forms)) {
            // Initialize with default data if empty
            const initialForms = this.getInitialForms();
            this.saveForms(initialForms);
            return initialForms;
        }
        return forms;
    }

    /**
     * Save forms array to storage
     */
    private saveForms(forms: ActivityForm[]): void {
        this.localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(forms));
    }

    /**
     * Get current form from storage
     */
    getCurrentForm(): ActivityForm | null {
        return this.localStorage.getObjectOrNull(CURRENT_FORM_STORAGE_KEY);
    }

    /**
     * Set current form in storage
     */
    setCurrentForm(form: ActivityForm | null): void {
        if (form === null) {
            this.localStorage.removeItem(CURRENT_FORM_STORAGE_KEY);
        } else {
            this.localStorage.setItem(
                CURRENT_FORM_STORAGE_KEY,
                JSON.stringify(form)
            );
        }
    }

    /**
     * Get form by ID
     */
    getFormById(id: string): ActivityForm | null {
        const forms = this.getAllForms();
        return forms.find((form) => form.id === id) || null;
    }

    /**
     * Add a new form
     */
    addForm(
        formData: Omit<
            ActivityForm,
            'id' | 'createdAt' | 'updatedAt' | 'status'
        >
    ): ActivityForm {
        const forms = this.getAllForms();
        const newForm: ActivityForm = {
            ...formData,
            id: Date.now().toString(),
            status: FormStatus.Draft,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        const updatedForms = [...forms, newForm];
        this.saveForms(updatedForms);
        return newForm;
    }

    /**
     * Update an existing form
     */
    updateForm(
        id: string,
        formData: Partial<ActivityForm>
    ): ActivityForm | null {
        const forms = this.getAllForms();
        const formIndex = forms.findIndex((form) => form.id === id);

        if (formIndex === -1) {
            return null;
        }

        const updatedForm = {
            ...forms[formIndex],
            ...formData,
            updatedAt: new Date().toISOString(),
        };

        const updatedForms = [
            ...forms.slice(0, formIndex),
            updatedForm,
            ...forms.slice(formIndex + 1),
        ];

        this.saveForms(updatedForms);

        // Update current form if it's the one being updated
        const currentForm = this.getCurrentForm();
        if (currentForm?.id === id) {
            this.setCurrentForm(updatedForm);
        }

        return updatedForm;
    }

    /**
     * Delete a form
     */
    deleteForm(id: string): boolean {
        const forms = this.getAllForms();
        const filteredForms = forms.filter((form) => form.id !== id);

        if (filteredForms.length === forms.length) {
            return false; // Form not found
        }

        this.saveForms(filteredForms);

        // Clear current form if it's the one being deleted
        const currentForm = this.getCurrentForm();
        if (currentForm?.id === id) {
            this.setCurrentForm(null);
        }

        return true;
    }

    /**
     * Clear all forms (useful for testing/reset)
     */
    clearAllForms(): void {
        this.localStorage.removeItem(FORMS_STORAGE_KEY);
        this.setCurrentForm(null);
    }
}
