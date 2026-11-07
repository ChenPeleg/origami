import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
    ActivityType,
    FormStatus,
    type ActivityForm,
} from '../models/ActivityApprovalForm';
import { useTranslate } from '../hooks/useTranslate';
import { useService } from '../services/provider/useService.ts';
import { FormsDataService } from '../services/FormsData.service.ts';
import { AppButton, AppModal } from '../common';

/**
 * Home Page
 * Lists all activity approval forms for the current user
 */
const HomePage = () => {
    const [formsDataService] = useService([FormsDataService]);
    // Use lazy initialization to avoid useEffect
    const [forms, setForms] = useState<ActivityForm[]>(() =>
        formsDataService.getAllForms()
    );
    const [pendingDeleteForm, setPendingDeleteForm] = useState<{
        id: string;
        title: string;
    } | null>(null);
    const navigate = useNavigate();
    const { t } = useTranslate();

    const getStatusBadge = (status: FormStatus) => {
        const statusConfig = {
            draft: {
                color: 'bg-gray-100 text-gray-800',
                label: t('טיוטה'),
            },
            pending: {
                color: 'bg-yellow-100 text-yellow-800',
                label: t('ממתין'),
            },
            approved: {
                color: 'bg-green-100 text-green-800',
                label: t('מאושר'),
            },
            rejected: {
                color: 'bg-red-100 text-red-800',
                label: t('נדחה'),
            },
        };
        const config = statusConfig[status];
        return (
            <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${config.color}`}
            >
                {config.label}
            </span>
        );
    };

    const getActivityTypeLabel = (type: ActivityType) => {
        const types: Record<ActivityType, string> = {
            [ActivityType.Trip]: t('טיול'),
            [ActivityType.SummerCamp]: t('מחנה קיץ'),
            [ActivityType.Other]: t('אחר'),
        };
        return types[type] || type;
    };

    const handleDeleteClick = (id: string, title: string) => {
        setPendingDeleteForm({ id, title });
    };

    const handleDeleteConfirm = () => {
        if (!pendingDeleteForm) {
            return;
        }

        formsDataService.deleteForm(pendingDeleteForm.id);
        setForms(formsDataService.getAllForms());
        setPendingDeleteForm(null);
    };

    const handleDeleteCancel = () => {
        setPendingDeleteForm(null);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <>
            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {forms.length === 0 ? (
                    <div className="rounded-lg bg-white py-12 text-center shadow dark:bg-gray-800">
                        <div className="mb-4 text-6xl text-gray-400">📋</div>
                        <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                            {t('עמוד_בית_אין_טפסים_כותרת')}
                        </h2>
                        <p className="mb-6 text-gray-600 dark:text-gray-400">
                            {t('עמוד_בית_אין_טפסים_תת_כותרת')}
                        </p>
                        <AppButton
                            type="button"
                            variant="primary"
                            onClick={() => navigate('/forms/new')}
                        >
                            {t('כפתור_צור_טופס_חדש')}
                        </AppButton>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {forms.map((form) => (
                            <div
                                key={form.id}
                                className="rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-md dark:bg-gray-800"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="mb-2 flex items-center gap-3">
                                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                                {form.title}
                                            </h2>
                                            {getStatusBadge(form.status)}
                                        </div>
                                        <div className="mb-3 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <span className="font-medium">
                                                    {t('תווית_סוג')}:
                                                </span>{' '}
                                                {getActivityTypeLabel(
                                                    form.activityType
                                                )}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <span className="font-medium">
                                                    {t('תווית_משתתפים')}:
                                                </span>{' '}
                                                {form.participantCount}
                                            </span>
                                        </div>
                                        <div className="mb-3 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <span className="font-medium">
                                                    {t('תווית_תאריך_התחלה')}:
                                                </span>{' '}
                                                {formatDate(form.startDate)}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <span className="font-medium">
                                                    {t('תווית_תאריך_סיום')}:
                                                </span>{' '}
                                                {formatDate(form.endDate)}
                                            </span>
                                        </div>
                                        {form.description && (
                                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                                {form.description}
                                            </p>
                                        )}
                                    </div>
                                    <div className="ml-4 flex gap-2">
                                        <AppButton
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30"
                                            onClick={() =>
                                                navigate(
                                                    `/forms/${form.id}/edit`
                                                )
                                            }
                                        >
                                            {t('כפתור_ערוך')}
                                        </AppButton>
                                        <AppButton
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
                                            onClick={() =>
                                                handleDeleteClick(
                                                    form.id,
                                                    form.title
                                                )
                                            }
                                        >
                                            {t('כפתור_מחק')}
                                        </AppButton>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <AppModal
                isOpen={pendingDeleteForm !== null}
                onClose={handleDeleteCancel}
                title={t('האם אתה בטוח שברצונך למחוק')}
                size="sm"
            >
                {pendingDeleteForm && (
                    <div className="space-y-4">
                        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                            {t('האם אתה בטוח שברצונך למחוק')} "
                            {pendingDeleteForm.title}"?
                        </p>
                        <div className="flex justify-end gap-3">
                            <AppButton
                                type="button"
                                variant="secondary"
                                onClick={handleDeleteCancel}
                            >
                                {t('כפתור_ביטול')}
                            </AppButton>
                            <AppButton
                                type="button"
                                variant="danger"
                                onClick={handleDeleteConfirm}
                            >
                                {t('כפתור_מחק')}
                            </AppButton>
                        </div>
                    </div>
                )}
            </AppModal>
        </>
    );
};

export default HomePage;
