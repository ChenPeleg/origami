import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import React from 'react';

export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';

export interface AppPopoverProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    position?: PopoverPosition;
    className?: string;
    panelClassName?: string;
}

const panelPositionClasses: Record<PopoverPosition, string> = {
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

/**
 * AppPopover renders a floating content panel that opens/closes on click.
 * Powered by Headless UI Popover — click-outside to close is built in.
 */
export function AppPopover({
    trigger,
    children,
    position = 'bottom',
    className,
    panelClassName,
}: AppPopoverProps) {
    return (
        <Popover className={['relative inline-block', className].filter(Boolean).join(' ')}>
            <PopoverButton as="div" className="cursor-pointer">
                {trigger}
            </PopoverButton>

            <Transition
                enter="transition ease-out duration-150"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <PopoverPanel
                    className={[
                        'absolute z-50 w-64 rounded-md bg-white p-3 shadow-lg ring-1 ring-black/5',
                        panelPositionClasses[position],
                        panelClassName || '',
                    ]
                        .join(' ')
                        .trim()}
                >
                    {children}
                </PopoverPanel>
            </Transition>
        </Popover>
    );
}
