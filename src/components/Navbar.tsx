import { useNavigate } from 'react-router';
import { useUser } from '../stores/UserContext';
import { useTranslate } from '../hooks/useTranslate';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import { Language } from '../models/Language';
import { useService } from '../services/provider/useService';
import { UserService } from '../services/User.service';
import { AppButton, AppDropdown, AppSelect } from '../common';

/**
 * Mapping of language codes to their translation keys
 */
const LANGUAGE_NAME_KEYS: Record<Language, string> = {
    [Language.Hebrew]: 'שפה_עברית',
    [Language.English]: 'שפה_אנגלית',
    [Language.Arabic]: 'שפה_ערבית',
};

/** Sun icon — shown in dark mode to switch back to light */
const SunIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
    >
        <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
        />
    </svg>
);

/** Moon icon — shown in light mode to switch to dark */
const MoonIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
    >
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
);

/**
 * Navbar Component
 * Displayed on all routes with navigation and user information
 */
const Navbar = () => {
    const navigate = useNavigate();
    const { user, clearUser } = useUser();
    const { t } = useTranslate();
    const { language, setLanguage, availableLanguages } = useLanguage();
    const { theme, setTheme } = useTheme();
    const [userService] = useService([UserService]);

    const handleLogout = async () => {
        await userService.logout();
        clearUser();
    };

    return (
        <header className="bg-white shadow-sm dark:bg-gray-900 dark:shadow-gray-700">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <AppButton
                            type="button"
                            variant="link"
                            size="lg"
                            className="text-2xl font-bold text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                            onClick={() => navigate('/')}
                        >
                            {t('כותרת_אפליקציה')}
                        </AppButton>
                        {user && (
                            <span className="hidden text-sm text-gray-600 sm:block dark:text-gray-400">
                                {t('ברכה_שלום')},{' '}
                                {user.name?.trim() || user.email}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <AppButton
                            type="button"
                            variant="secondary"
                            onClick={() => navigate('/')}
                        >
                            {t('ניווט_בית')}
                        </AppButton>
                        <AppButton
                            type="button"
                            onClick={() => navigate('/forms/new')}
                        >
                            {t('כפתור_טופס_חדש')}
                        </AppButton>

                        {/* Language Switcher */}
                        <div className="min-w-36">
                            <AppSelect
                                id="language"
                                value={language}
                                onChange={(value) =>
                                    setLanguage(value as Language)
                                }
                                options={availableLanguages.map((lang) => ({
                                    value: lang,
                                    label: t(LANGUAGE_NAME_KEYS[lang]),
                                }))}
                            />
                        </div>

                        {/* Dark Mode Toggle */}
                        <AppButton
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                setTheme(theme === 'dark' ? 'light' : 'dark')
                            }
                            aria-label={t('dark_mode_toggle')}
                            className="h-9 w-9 p-0 text-gray-600 hover:bg-gray-100 focus-visible:ring-blue-500 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                        </AppButton>

                        {/* User Avatar Dropdown */}
                        {user && (
                            <AppDropdown
                                position="right"
                                trigger={
                                    <AppButton
                                        type="button"
                                        variant="primary"
                                        className="h-10 w-10 rounded-full p-0 text-sm font-semibold"
                                        aria-label="User menu"
                                    >
                                        {userService.getUserInitials(user)}
                                    </AppButton>
                                }
                                items={[
                                    {
                                        label: t('ניווט_פרופיל'),
                                        onClick: () => navigate('/profile'),
                                    },
                                    {
                                        label: t('כפתור_מסך_מנהל'),
                                        onClick: () =>
                                            userService.navigateToAdmin(),
                                        divider: true,
                                    },
                                    {
                                        label: t('כפתור_התנתק'),
                                        onClick: handleLogout,
                                    },
                                ]}
                            />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
