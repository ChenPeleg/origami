import React from 'react';

export type HandNoteSize = 'md' | 'lg';

export interface AppHandNoteProps {
    /** Element to render, `p` by default */
    as?: 'p' | 'span' | 'div';
    size?: HandNoteSize;
    className?: string;
    children?: React.ReactNode;
}

const sizeClasses: Record<HandNoteSize, string> = {
    md: 'text-[26px] leading-none',
    lg: 'text-[30px] leading-[1.1]',
};

/**
 * AppHandNote is a short handwritten note in pencil teal.
 * Use it for tips and small remarks only, never for reading text.
 */
export function AppHandNote({
    as: Component = 'p',
    size = 'lg',
    className,
    children,
}: AppHandNoteProps) {
    const classes = [
        'font-hand font-bold text-teal',
        sizeClasses[size],
        className || '',
    ]
        .filter(Boolean)
        .join(' ');

    return <Component className={classes}>{children}</Component>;
}
