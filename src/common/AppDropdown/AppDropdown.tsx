import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from '@headlessui/react';
import React, { Fragment } from 'react';

export interface AppDropdownItem {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    disabled?: boolean;
    divider?: boolean;
}

export interface AppDropdownProps {
    trigger: React.ReactNode;
    items: AppDropdownItem[];
    position?: 'left' | 'right';
    className?: string;
    menuClassName?: string;
}

const positionClasses: Record<'left' | 'right', string> = {
    left: 'left-0 origin-top-left',
    right: 'right-0 origin-top-right',
};

/**
 * AppDropdown renders a keyboard-navigable dropdown menu powered by Headless UI Menu.
 * Supports icons, dividers, and disabled items.
 */
export function AppDropdown({
    trigger,
    items,
    position = 'left',
    className,
    menuClassName,
}: AppDropdownProps) {
    return (
        <Menu as="div" className={['relative inline-block', className].filter(Boolean).join(' ')}>
            <MenuButton as={Fragment}>{trigger}</MenuButton>

            <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <MenuItems
                    className={[
                        'absolute z-50 mt-2 min-w-[10rem] rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none',
                        positionClasses[position],
                        menuClassName || '',
                    ]
                        .join(' ')
                        .trim()}
                >
                    {items.map((item, index) => (
                        <Fragment key={`${item.label}-${index}`}>
                            <MenuItem disabled={item.disabled}>
                                {({ focus, disabled }) => (
                                    <button
                                        onClick={item.onClick}
                                        disabled={disabled}
                                        className={[
                                            'flex w-full items-center gap-2 px-4 py-2 text-sm',
                                            focus && !disabled
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700',
                                            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
                                        ]
                                            .filter(Boolean)
                                            .join(' ')}
                                    >
                                        {item.icon && (
                                            <span className="h-4 w-4 flex-shrink-0">{item.icon}</span>
                                        )}
                                        {item.label}
                                    </button>
                                )}
                            </MenuItem>
                            {item.divider && (
                                <div className="my-1 border-t border-gray-200" role="separator" />
                            )}
                        </Fragment>
                    ))}
                </MenuItems>
            </Transition>
        </Menu>
    );
}
