import React, { useState } from 'react';
import { AppAccordionItem } from './AppAccordionItem';

export type { AppAccordionItem as AppAccordionItemType } from './AppAccordionItem';

export interface AppAccordionProps {
    items: Array<{
        id: string;
        title: string;
        content: React.ReactNode;
        icon?: React.ReactNode;
    }>;
    /** Allow multiple items to be open simultaneously. Default: false. */
    allowMultiple?: boolean;
    defaultOpen?: string[];
    className?: string;
    itemClassName?: string;
}

/**
 * AppAccordion renders a list of collapsible content sections.
 * Each item uses a controlled button/panel pattern for accessibility and keyboard support.
 *
 * When `allowMultiple` is false (default) only one item can be open at a time;
 * opening a new item closes the previously open one.
 */
export function AppAccordion({
    items,
    allowMultiple = false,
    defaultOpen = [],
    className,
    itemClassName,
}: AppAccordionProps) {
    const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpen));

    function handleToggle(id: string) {
        setOpenIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                if (!allowMultiple) {
                    next.clear();
                }
                next.add(id);
            }
            return next;
        });
    }

    return (
        <div className={['space-y-2', className].filter(Boolean).join(' ')}>
            {items.map((item) => (
                <AppAccordionItem
                    key={item.id}
                    item={item}
                    isOpen={openIds.has(item.id)}
                    onToggle={handleToggle}
                    itemClassName={itemClassName}
                />
            ))}
        </div>
    );
}
