import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppHandNote } from './AppHandNote';

const meta = {
    title: 'Common/AppHandNote',
    component: AppHandNote,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['md', 'lg'],
            description: 'Text size',
        },
        as: {
            control: 'select',
            options: ['p', 'span', 'div'],
            description: 'Element to render',
        },
    },
    args: { children: 'corner to corner!' },
} satisfies Meta<typeof AppHandNote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {};

export const Medium: Story = {
    args: { size: 'md', children: 'continue from step 2' },
};
