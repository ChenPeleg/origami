import { AppToast } from './AppToast';
import { useToastContext } from './ToastContext';

/**
 * AppToastContainer renders all active toasts stacked in the bottom-right corner.
 * Place this once near the root of your application (outside the main content area).
 */
export function AppToastContainer() {
    const { toasts, removeToast } = useToastContext();

    return (
        <div
            aria-live="polite"
            aria-atomic="false"
            className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2"
        >
            {toasts.map((toast) => (
                <div key={toast.id} className="pointer-events-auto">
                    <AppToast {...toast} onDismiss={removeToast} />
                </div>
            ))}
        </div>
    );
}
