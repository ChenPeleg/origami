import { useUser } from '../stores/UserContext';
import { useNavigate } from 'react-router';
import { useTranslate } from '../hooks/useTranslate.tsx';
import { UserService } from '../services/User.service.ts';
import { useService } from '../services/provider/useService.ts';
import { AppButton } from '../common';

/**
 * Profile Page
 * Displays user profile information
 */
const ProfilePage = () => {
    const { user, clearUser } = useUser();
    const [userService] = useService([UserService]);
    const { t } = useTranslate();
    const navigate = useNavigate();

    const handleLogout = () => {
        clearUser();
        navigate('/');
    };

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <h1 className="mb-4 text-2xl font-bold text-gray-800">
                        {t('אין משתמש מחובר')}
                    </h1>
                    <AppButton
                        type="button"
                        variant="primary"
                        onClick={() => navigate('/')}
                    >
                        {t('עבור לבית')}
                    </AppButton>
                </div>
            </div>
        );
    }

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'admin':
                return 'bg-red-100 text-red-800';
            case 'leader':
                return 'bg-blue-100 text-blue-800';
            case 'member':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="py-8">
            <div className="mx-auto max-w-4xl px-4">
                <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {t('עמוד_פרופיל_כותרת')}
                </h1>

                {/* Profile Card */}
                <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                    <div className="mb-6 flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            {/* Avatar Placeholder */}
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500 text-2xl font-bold text-white">
                                {userService.getUserInitials(user)}
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                    {user.name}
                                </h2>
                                <span
                                    className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${getRoleBadgeColor(user.role)}`}
                                >
                                    {user.role.charAt(0).toUpperCase() +
                                        user.role.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="space-y-4">
                        <div className="border-t pt-4 dark:border-gray-700">
                            <h3 className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                {t('תווית_מזהה_משתמש')}
                            </h3>
                            <p className="text-gray-900 dark:text-gray-100">{user.id}</p>
                        </div>

                        <div className="border-t pt-4 dark:border-gray-700">
                            <h3 className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                {t('תווית_דואל')}
                            </h3>
                            <p className="text-gray-900 dark:text-gray-100">{user.email}</p>
                        </div>

                        <div className="border-t pt-4 dark:border-gray-700">
                            <h3 className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                {t('תווית_תפקיד')}
                            </h3>
                            <p className="text-gray-900 capitalize dark:text-gray-100">
                                {user.role}
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex gap-3 border-t pt-6 dark:border-gray-700">
                        <AppButton
                            type="button"
                            variant="danger"
                            onClick={handleLogout}
                        >
                            {t('כפתור_התנתק')}
                        </AppButton>
                        <AppButton
                            type="button"
                            variant="secondary"
                            onClick={() => navigate('/')}
                        >
                            {t('כפתור_הצג_טפסים')}
                        </AppButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
