import type { Decorator } from '@storybook/react-vite';
import { useEffect } from 'react';

/**
 * Direction Decorator for Storybook
 * Allows switching between LTR and RTL layouts globally via toolbar
 */
export const DirectionDecorator: Decorator = (Story, context) => {
    const direction = context.globals.direction || 'auto';

    useEffect(() => {
        // Set document direction based on global parameter
        if (direction === 'ltr') {
            document.documentElement.dir = 'ltr';
        } else if (direction === 'rtl') {
            document.documentElement.dir = 'rtl';
        } else {
            // 'auto' - use browser default (typically LTR)
            document.documentElement.dir = '';
        }
    }, [direction]);

    return (
        <div dir={direction === 'auto' ? undefined : direction}>
            <Story />
        </div>
    );
};

