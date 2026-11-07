import { Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import type { Toast, ToastType } from './ToastContext';

export interface AppToastProps extends Toast {
    onDismiss: (id: string) => void;
}

const typeConfig: Record<
    ToastType,
    { bg: string; border: string; icon: React.ReactNode; bar: string }
> = {
    success: {
        bg: 'bg-white',
        border: 'border-green-400',
        bar: 'bg-green-400',
        icon: (
            <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    },
    error: {
        bg: 'bg-white',
        border: 'border-red-400',
        bar: 'bg-red-400',
        icon: (
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    },
    warning: {
        bg: 'bg-white',
        border: 'border-yellow-400',
        bar: 'bg-yellow-400',
        icon: (
            <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                    fillRule="evenodd"
                    d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    },
    info: {
        bg: 'bg-white',
        border: 'border-blue-400',
        bar: 'bg-blue-400',
        icon: (
            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    },
};

/**
 * AppToast renders a single notification with an icon, message, dismiss button, and progress bar.
 */
export function AppToast({ id, type, message, duration = 5000, onDismiss }: AppToastProps) {
    const [visible, setVisible] = useState(true);
    const config = typeConfig[type];

    // Start hide transition slightly before the timer fires so the animation completes
    useEffect(() => {
        if (duration <= 0) return;
        const hideAfter = Math.max(duration - 300, 0);
        const t = setTimeout(() => setVisible(false), hideAfter);
        return () => clearTimeout(t);
    }, [duration]);

    const handleAfterLeave = () => onDismiss(id);

    return (
        <Transition
            as={Fragment}
            show={visible}
            enter="transform transition ease-out duration-300"
            enterFrom="translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-100"
            leave="transform transition ease-in duration-200"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="translate-x-full opacity-0"
            afterLeave={handleAfterLeave}
        >
            <div
                role="alert"
                aria-live="assertive"
                className={[
                    'relative w-72 overflow-hidden rounded-md border-l-4 shadow-md',
                    config.bg,
                    config.border,
                ].join(' ')}
            >
                <div className="flex items-start gap-3 px-3 py-3">
                    <span className="mt-0.5 flex-shrink-0">{config.icon}</span>
                    <p className="flex-1 text-sm text-gray-800">{message}</p>
                    <button
                        onClick={() => setVisible(false)}
                        aria-label="Dismiss notification"
                        className="flex-shrink-0 rounded text-gray-400 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                    </button>
                </div>

                {/* Progress bar */}
                {duration > 0 && (
                    <div
                        className={['h-1 w-full origin-left motion-reduce:hidden', config.bar].join(' ')}
                        style={{
                            animation: `shrink ${duration}ms linear forwards`,
                        }}
                    />
                )}
            </div>
        </Transition>
    );
}
