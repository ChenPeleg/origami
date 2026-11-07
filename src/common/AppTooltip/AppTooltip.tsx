import React, { useId, useRef, useState } from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface AppTooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
    position?: TooltipPosition;
    delay?: number;
    className?: string;
}

const positionClasses: Record<TooltipPosition, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const arrowClasses: Record<TooltipPosition, string> = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-900',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-900',
    right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-900',
};

/**
 * AppTooltip displays contextual information when the user hovers over a trigger element.
 * Uses pure React state — no Headless UI dependency required.
 */
export function AppTooltip({
    content,
    children,
    position = 'top',
    delay = 200,
    className,
}: AppTooltipProps) {
    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const tooltipId = useId();

    const show = () => {
        timeoutRef.current = setTimeout(() => setVisible(true), delay);
    };

    const hide = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setVisible(false);
    };

    return (
        <span
            className="relative inline-block"
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={hide}
            aria-describedby={visible ? tooltipId : undefined}
        >
            {children}

            <span
                id={tooltipId}
                role="tooltip"
                className={[
                    'pointer-events-none absolute z-50 w-max max-w-xs rounded bg-gray-900 px-2 py-1 text-xs text-white shadow-md transition-opacity duration-150',
                    positionClasses[position],
                    visible ? 'opacity-100' : 'opacity-0',
                    className || '',
                ]
                    .join(' ')
                    .trim()}
            >
                {content}
                {/* Arrow */}
                <span
                    className={[
                        'absolute h-0 w-0 border-4',
                        arrowClasses[position],
                    ].join(' ')}
                />
            </span>
        </span>
    );
}
