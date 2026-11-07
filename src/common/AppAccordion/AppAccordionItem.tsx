import React from 'react';

export interface AppAccordionItem {
    id: string;
    title: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
}

export interface AppAccordionItemProps {
    item: AppAccordionItem;
    /** Controlled open state managed by parent AppAccordion. */
    isOpen: boolean;
    /** Called when the item header is clicked. */
    onToggle: (id: string) => void;
    itemClassName?: string;
}

/**
 * AppAccordionItem renders a single collapsible section.
 * Open state is controlled by the parent AppAccordion component.
 * Uses aria-expanded / aria-controls for accessibility and keyboard support.
 */
export function AppAccordionItem({ item, isOpen, onToggle, itemClassName }: AppAccordionItemProps) {
    const panelId = `accordion-panel-${item.id}`;
    const buttonId = `accordion-button-${item.id}`;

    return (
        <div
            className={[
                'overflow-hidden rounded-md border border-gray-200',
                itemClassName || '',
            ]
                .join(' ')
                .trim()}
        >
            <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => onToggle(item.id)}
                className="flex w-full items-center justify-between bg-white px-4 py-3 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
                <span className="flex items-center gap-2">
                    {item.icon && (
                        <span className="h-4 w-4 flex-shrink-0 text-gray-500">{item.icon}</span>
                    )}
                    {item.title}
                </span>
                {/* Chevron icon */}
                <svg
                    className={[
                        'h-4 w-4 flex-shrink-0 text-gray-500 transition-transform duration-200',
                        isOpen ? 'rotate-180' : 'rotate-0',
                    ].join(' ')}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="border-t border-gray-200 bg-white px-4 py-3 text-sm text-gray-600"
                >
                    {item.content}
                </div>
            )}
        </div>
    );
}
