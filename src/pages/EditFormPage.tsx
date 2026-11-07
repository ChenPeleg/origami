import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';
import { ActivityType } from '../models/ActivityApprovalForm';
import { useNavigate, useParams } from 'react-router';
import { useTranslate } from '../hooks/useTranslate';
import { useFormsDataService } from '../hooks/useFormsDataService';
import { AppInput } from '../common/AppInput/AppInput.tsx';
import { AppFormField } from '../common/AppFormField/AppFormField.tsx';
import { AppDateInput } from '../common/AppDateInput/AppDateInput.tsx';
import { AppTextArea } from '../common/AppTextArea/AppTextArea.tsx';
import { AppSelect } from '../common/AppSelect/AppSelect';
import { AppButton } from '../common';
import { useService } from '../services/provider/useService.ts';
import { WindowService } from '../services/Window.service.ts';

/**
 * Edit Form Page
 * Edit an existing activity approval form
 */
const EditFormPage = () => {
    const formsDataService = useFormsDataService();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslate();
    const windowService = useService(WindowService);

    // Load existing form data
    const existingForm = useMemo(() => {
        if (!id) return null;
        return formsDataService.getFormById(id);
    }, [id, formsDataService]);

    const [formData, setFormData] = useState(() => {
        if (existingForm) {
            return {
                title: existingForm.title,
                activityType: existingForm.activityType,
                startDate: existingForm.startDate,
                endDate: existingForm.endDate,
                participantCount: existingForm.participantCount,
                description: existingForm.description || '',
            };
        }
        return {
            title: '',
            activityType: ActivityType.Trip,
            startDate: '',
            endDate: '',
            participantCount: 1,
            description: '',
        };
    });

    const notFound = !id || existingForm === null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!id) {
            return;
        }

        // Basic validation
        if (!formData.title || !formData.startDate || !formData.endDate) {
            alert(t('אנא מלא את כל השדות הנדרשים'));
            return;
        }

        if (new Date(formData.startDate) > new Date(formData.endDate)) {
            alert(t('תאריך סיום חייב להיות אחרי תאריך התחלה'));
            return;
        }

        // Update form using service
        formsDataService.updateForm(id, formData);

        // Navigate back to home
        navigate('/');
    };

    const handleCancel = () => {
        if (
            windowService.window.confirm(
                t('האם אתה בטוח שברצונך לבטל? כל השינויים יאבדו.')
            )
        ) {
            navigate('/');
        }
    };

    // Loading state
    if (notFound) {
        return (
            <div className="flex items-center justify-center py-24">
                <div className="text-center">
                    <div className="mb-4 text-6xl">❌</div>
                    <h1 className="mb-2 text-2xl font-bold text-gray-900">
                        {t('עמוד_עריכת_טופס_לא_נמצא_כותרת')}
                    </h1>
                    <p className="mb-6 text-gray-600">
                        {t('עמוד_עריכת_טופס_לא_נמצא_תת_כותרת')}
                    </p>
                    <AppButton
                        type="button"
                        variant="primary"
                        onClick={() => navigate('/')}
                    >
                        {t('כפתור_חזרה_לבית')}
                    </AppButton>
                </div>
            </div>
        );
    }

    return (
        <div className="py-8">
            <div className="mx-auto max-w-3xl px-4">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {t('עמוד_עריכת_טופס_כותרת')}
                    </h1>
                    <p className="mt-2 text-gray-600">
                        {t('עמוד_עריכת_טופס_תת_כותרת')}
                    </p>
                </div>

                {/* Form Card */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <form onSubmit={handleSubmit}>
                        {/* Title */}
                        <AppFormField
                            label={
                                <>
                                    {' '}
                                    {t('תווית_כותרת_פעילות')}{' '}
                                    <span className="text-red-500">*</span>
                                </>
                            }
                        >
                            <AppInput
                                type="text"
                                id="title"
                                required
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        title: e.target.value,
                                    })
                                }
                                placeholder={t('מקום_מחזיק_כותרת_פעילות')}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                        </AppFormField>

                        {/* Activity Type */}
                        <AppFormField
                            label={
                                <>
                                    {t('תווית_סוג_פעילות')}{' '}
                                    <span className="text-red-500">*</span>
                                </>
                            }
                        >
                            <AppSelect
                                id="activityType"
                                value={formData.activityType}
                                onChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        activityType: value as ActivityType,
                                    })
                                }
                                options={[
                                    {
                                        value: ActivityType.Trip,
                                        label: t('סוג_פעילות_טיול'),
                                    },
                                    {
                                        value: ActivityType.SummerCamp,
                                        label: t('סוג_פעילות_מחנה_קיץ'),
                                    },
                                    {
                                        value: ActivityType.Other,
                                        label: t('סוג_פעילות_אחר'),
                                    },
                                ]}
                            />
                        </AppFormField>

                        {/* Date Range */}
                        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                            <AppFormField
                                label={
                                    <>
                                        {t('תווית_תאריך_התחלה')}{' '}
                                        <span className="text-red-500">*</span>
                                    </>
                                }
                            >
                                <AppDateInput
                                    id="startDate"
                                    required
                                    value={formData.startDate}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            startDate: e.target.value,
                                        })
                                    }
                                />
                            </AppFormField>
                            <AppFormField
                                label={
                                    <>
                                        {t('תווית_תאריך_סיום')}{' '}
                                        <span className="text-red-500">*</span>
                                    </>
                                }
                            >
                                <AppDateInput
                                    id="endDate"
                                    required
                                    value={formData.endDate}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            endDate: e.target.value,
                                        })
                                    }
                                />
                            </AppFormField>
                        </div>

                        {/* Participant Count */}
                        <AppFormField
                            label={
                                <>
                                    {t('תווית_מספר_משתתפים')}{' '}
                                    <span className="text-red-500">*</span>
                                </>
                            }
                        >
                            <AppInput
                                type="number"
                                id="participantCount"
                                required
                                min="1"
                                max="1000"
                                value={formData.participantCount}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        participantCount:
                                            parseInt(e.target.value) || 1,
                                    })
                                }
                            />
                        </AppFormField>

                        {/* Description */}
                        <AppFormField label={t('תווית_תיאור_אופציונלי')}>
                            <AppTextArea
                                id="description"
                                rows={4}
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                                placeholder={t('מקום_מחזיק_תיאור')}
                            />
                        </AppFormField>

                        {/* Form Actions */}
                        <div className="flex gap-4 border-t pt-6">
                            <AppButton
                                type="submit"
                                variant="primary"
                            >
                                {t('כפתור_שמור_שינויים')}
                            </AppButton>
                            <AppButton
                                type="button"
                                variant="secondary"
                                onClick={handleCancel}
                            >
                                {t('כפתור_ביטול')}
                            </AppButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditFormPage;
