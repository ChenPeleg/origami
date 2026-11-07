import { useEffect } from 'react';
import { useGlobalState, type Theme } from '../stores/GlobalState';
import { useService } from '../services/provider/useService';
import { LocalStorageService } from '../services/LocalStorage.service';
import { WindowService } from '../services/Window.service';

const THEME_STORAGE_KEY = 'app-theme';

/**
 * Hook to manage dark/light theme switching.
 *
 * - Reads the persisted theme from `LocalStorageService` on mount and hydrates GlobalState.
 * - Persists the chosen theme to `LocalStorageService` whenever it changes.
 * - Toggles the `dark` class on `document.documentElement` via `WindowService` so
 *   Tailwind's `dark:` variants take effect.
 *
 * @returns Object with current theme and setTheme method
 */
export const useTheme = () => {
    const [localStorageService, windowService] = useService([
        LocalStorageService,
        WindowService,
    ]);
    const { globalState, setTheme } = useGlobalState();
    const theme: Theme = globalState.theme;

    // Hydrate theme from localStorage on mount
    useEffect(() => {
        const stored = localStorageService.getItem(THEME_STORAGE_KEY);
        if (stored === 'dark' || stored === 'light') {
            setTheme(stored);
        }
        // Intentionally run only on mount to load persisted preference
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Apply dark class on <html> and persist to localStorage when theme changes
    useEffect(() => {
        windowService.window.document.documentElement.classList.toggle(
            'dark',
            theme === 'dark'
        );
        localStorageService.setItem(THEME_STORAGE_KEY, theme);
    }, [theme, windowService, localStorageService]);

    return { theme, setTheme };
};
