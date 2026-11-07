import type { FormEvent } from 'react';
import { useState } from 'react';
import { ActivityType } from '../models/ActivityApprovalForm';
import { useNavigate } from 'react-router';
import { useTranslate } from '../hooks/useTranslate';
import { useFormsDataService } from '../hooks/useFormsDataService';
import { AppInput } from '../common/AppInput/AppInput.tsx';
import { AppFormField } from '../common/AppFormField/AppFormField.tsx';
import { AppTextArea } from '../common/AppTextArea/AppTextArea.tsx';
import { AppSelect } from '../common/AppSelect/AppSelect';
import { AppDateInput } from '../common/AppDateInput/AppDateInput.tsx';
import { AppButton } from '../common';
import { useService } from '../services/provider/useService.ts';
import { WindowService } from '../services/Window.service.ts';

/**
 * New Form Page
 * Create a new activity approval form
 */
const NewFormPage = () => {
    const formsDataService = useFormsDataService();
    const navigate = useNavigate();
    const { t } = useTranslate();
    const windowService = useService(WindowService);

    const [formData, setFormData] = useState({
        title: '',
        activityType: ActivityType.Trip,
        startDate: '',
        endDate: '',
        participantCount: 1,
        description: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.title || !formData.startDate || !formData.endDate) {
            alert(t('אנא מלא את כל השדות הנדרשים'));
            return;
        }

        if (new Date(formData.startDate) > new Date(formData.endDate)) {
            alert(t('תאריך סיום חייב להיות אחרי תאריך התחלה'));
            return;
        }

        // Add form using service
        formsDataService.addForm(formData);

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

    return (
        <div className="py-8">
            <div className="mx-auto max-w-3xl px-4">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {t('עמוד_טופס_חדש_כותרת')}
                    </h1>
                    <p className="mt-2 text-gray-600">
                        {t('עמוד_טופס_חדש_תת_כותרת')}
                    </p>
                </div>

                {/* Form Card */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <form onSubmit={handleSubmit}>
                        {/* Title */}
                        <AppFormField
                            label={
                                <>
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
                                {t('כפתור_צור_טופס')}
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

export default NewFormPage;
