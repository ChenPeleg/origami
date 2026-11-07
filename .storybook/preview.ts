import type { Preview } from '@storybook/react-vite';
//@ts-expect-error this file exits
import '../src/index.css';
import { DirectionDecorator } from './decorators/DirectionDecorator';

const preview: Preview = {
    decorators: [DirectionDecorator],

    globalTypes: {
        direction: {
            description: 'Text direction for components',
            defaultValue: 'auto',
            toolbar: {
                title: 'Direction',
                icon: 'transfer',
                items: [
                    { value: 'auto', title: 'Auto', icon: 'circlehollow' },
                    { value: 'ltr', title: 'LTR', icon: 'arrowleft' },
                    { value: 'rtl', title: 'RTL', icon: 'arrowright' },
                ],
                dynamicTitle: true,
            },
        },
    },

    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },

        a11y: {
            // 'todo' - show a11y violations in the test UI only
            // 'error' - fail CI on a11y violations
            // 'off' - skip a11y checks entirely
            test: 'error',
        },
    },
};

export default preview;
