import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import React, { Fragment } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface AppModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    showCloseButton?: boolean;
    size?: ModalSize;
    className?: string;
}

const sizeClasses: Record<ModalSize, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full',
};

/**
 * AppModal renders an accessible overlay dialog with backdrop using Headless UI Dialog.
 * Focus is trapped inside the modal; Escape key closes it automatically.
 */
export function AppModal({
    isOpen,
    onClose,
    title,
    children,
    showCloseButton = true,
    size = 'md',
    className,
}: AppModalProps) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                dir={'rtl'}
                className="relative z-50"
                onClose={onClose}
            >
                {/* Backdrop */}
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="fixed inset-0 bg-black/40"
                        aria-hidden="true"
                    />
                </TransitionChild>

                {/* Scroll container */}
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-200"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-150"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel
                                className={[
                                    'w-full rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800',
                                    sizeClasses[size],
                                    className || '',
                                ]
                                    .join(' ')
                                    .trim()}
                            >
                                {(title || showCloseButton) && (
                                    <div className="mb-4 flex items-center justify-between">
                                        {title && (
                                            <DialogTitle className="text-base font-semibold text-gray-900 dark:text-gray-100">
                                                {title}
                                            </DialogTitle>
                                        )}
                                        {showCloseButton && (
                                            <button
                                                onClick={onClose}
                                                aria-label="Close dialog"
                                                className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                            >
                                                <svg
                                                    className="h-5 w-5"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                )}
                                {children}
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
