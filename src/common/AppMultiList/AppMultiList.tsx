import { useId, useMemo, useState } from 'react';

export interface AppMultiListOption<T = string> {
    value: T;
    label: string;
    disabled?: boolean;
}

export interface AppMultiListProps<T = string> {
    options: AppMultiListOption<T>[];
    value: T[];
    onChange: (selected: T[]) => void;
    maxHeight?: string;
    searchable?: boolean;
    placeholder?: string;
    className?: string;
}

const DEFAULT_MAX_HEIGHT = 'max-h-60';
const DEFAULT_PLACEHOLDER = 'Search...';

export function AppMultiList<T = string>({
    options,
    value,
    onChange,
    maxHeight = DEFAULT_MAX_HEIGHT,
    searchable = false,
    placeholder = DEFAULT_PLACEHOLDER,
    className,
}: AppMultiListProps<T>) {
    const [searchQuery, setSearchQuery] = useState('');
    const idPrefix = useId();

    const filteredOptions = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLowerCase();
        if (!normalizedQuery) {
            return options;
        }

        return options.filter((option) => option.label.toLowerCase().includes(normalizedQuery));
    }, [options, searchQuery]);

    const selectedValues = useMemo(() => new Set(value), [value]);

    function isSelected(optionValue: T): boolean {
        return selectedValues.has(optionValue);
    }

    function handleToggle(option: AppMultiListOption<T>): void {
        if (option.disabled) {
            return;
        }

        if (isSelected(option.value)) {
            onChange(value.filter((selectedValue) => selectedValue !== option.value));
            return;
        }

        onChange([...value, option.value]);
    }

    return (
        <div className={['w-full', className].filter(Boolean).join(' ')}>
            {searchable && (
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder={placeholder}
                    className="mb-2 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                />
            )}

            <ul
                role="listbox"
                aria-multiselectable="true"
                className={['overflow-y-auto rounded-lg border border-gray-300 bg-white', maxHeight]
                    .filter(Boolean)
                    .join(' ')}
            >
                {filteredOptions.map((option, index) => {
                    const normalizedOptionId = String(option.value)
                        .replace(/\s+/g, '-')
                        .replace(/[^A-Za-z0-9_:.-]/g, '');
                    const checkboxId = `${idPrefix}-option-${normalizedOptionId || index}`;
                    const selected = isSelected(option.value);

                    return (
                        <li
                            key={String(option.value)}
                            role="option"
                            aria-selected={selected}
                            className={['border-b border-gray-100 last:border-b-0', option.disabled ? 'opacity-60' : '']
                                .filter(Boolean)
                                .join(' ')}
                        >
                            <label
                                htmlFor={checkboxId}
                                className={[
                                    'flex items-center gap-3 px-3 py-2',
                                    option.disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50',
                                ]
                                    .filter(Boolean)
                                    .join(' ')}
                            >
                                <input
                                    id={checkboxId}
                                    type="checkbox"
                                    checked={selected}
                                    disabled={option.disabled}
                                    onChange={() => handleToggle(option)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed"
                                />
                                <span className="text-sm text-gray-900">{option.label}</span>
                            </label>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
