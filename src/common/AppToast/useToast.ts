import { useToastContext } from './ToastContext';

export interface UseToastReturn {
    showSuccess: (message: string, duration?: number) => void;
    showError: (message: string, duration?: number) => void;
    showWarning: (message: string, duration?: number) => void;
    showInfo: (message: string, duration?: number) => void;
}

/**
 * useToast provides typed helpers for displaying toast notifications.
 * Must be used inside a ToastProvider.
 */
export function useToast(): UseToastReturn {
    const { addToast } = useToastContext();

    return {
        showSuccess: (message, duration) => addToast({ type: 'success', message, duration }),
        showError: (message, duration) => addToast({ type: 'error', message, duration }),
        showWarning: (message, duration) => addToast({ type: 'warning', message, duration }),
        showInfo: (message, duration) => addToast({ type: 'info', message, duration }),
    };
}
