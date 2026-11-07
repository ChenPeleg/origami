import React, { createContext, useCallback, useContext, useRef, useState } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}

interface ToastContextValue {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, 'id'>) => void;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * ToastProvider manages the global toast state.
 * Wrap your application (or the relevant subtree) with this provider.
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const timersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
    const counterRef = useRef(0);

    const removeToast = useCallback((id: string) => {
        clearTimeout(timersRef.current[id]);
        delete timersRef.current[id];
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const addToast = useCallback(
        (toast: Omit<Toast, 'id'>) => {
            const id = `toast-${++counterRef.current}`;
            const duration = toast.duration ?? 5000;

            setToasts((prev) => [...prev, { ...toast, id, duration }]);

            if (duration > 0) {
                timersRef.current[id] = setTimeout(() => removeToast(id), duration);
            }
        },
        [removeToast],
    );

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
        </ToastContext.Provider>
    );
}

/**
 * Internal hook — consumed by useToast and AppToastContainer.
 */
export function useToastContext(): ToastContextValue {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        throw new Error('useToastContext must be used inside a ToastProvider');
    }
    return ctx;
}
