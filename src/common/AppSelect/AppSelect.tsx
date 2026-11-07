import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/react';

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    id?: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    disabled?: boolean;
    className?: string;
}

export function AppSelect({
    value,
    onChange,
    options,
    disabled = false,
    className = '',
}: SelectProps) {
    const selectedOption = options.find((opt) => opt.value === value);

    return (
        <div className="relative">
            <Listbox value={value} onChange={onChange} disabled={disabled}>
                <ListboxButton
                    className={
                        className ||
                        'relative w-full min-w-24 rounded-lg border border-gray-300 bg-white py-2 ps-4 pe-8 text-right text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 data-open:ring-2 data-open:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:disabled:bg-gray-700'
                    }
                >
                    <span className="block truncate">
                        {selectedOption?.label || ''}
                    </span>
                    <span className="pointer-events-none absolute inset-y-1 inset-e-2 flex items-center">
                        <svg
                            className="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </ListboxButton>
                <ListboxOptions
                    anchor="bottom"
                    className="ring-opacity-5 z-10 mt-1 max-h-60 overflow-auto rounded-lg bg-white shadow-lg ring-1 ring-black focus:outline-none dark:bg-gray-800 dark:ring-gray-600"
                >
                    {options.map((option) => (
                        <ListboxOption
                            key={option.value}
                            value={option.value}
                            className="group relative w-full cursor-pointer py-2 ps-4 pe-8 text-gray-900 select-none data-focus:bg-blue-100 data-selected:bg-blue-600 data-selected:text-white dark:text-gray-100 dark:data-focus:bg-blue-900"
                        >
                            <span className="block truncate font-normal group-data-selected:font-semibold">
                                {option.label}
                            </span>
                            <span className="absolute inset-y-0 inset-e-2 flex h-full items-center text-blue-600 group-data-focus:text-blue-600 group-data-selected:text-white [.group:not([data-selected])_&]:hidden">
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>
        </div>
    );
}
