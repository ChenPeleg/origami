import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppTooltip } from './AppTooltip';

const meta = {
    title: 'Common/AppTooltip',
    component: AppTooltip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        position: {
            control: 'select',
            options: ['top', 'bottom', 'left', 'right'],
            description: 'Position of the tooltip relative to the trigger',
        },
        delay: {
            control: 'number',
            description: 'Delay in milliseconds before the tooltip appears',
        },
        content: {
            control: 'text',
            description: 'Tooltip content',
        },
    },
} satisfies Meta<typeof AppTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        content: 'This is a tooltip',
        children: <button className="rounded bg-blue-500 px-4 py-2 text-white">Hover me</button>,
        position: 'top',
    },
};

export const Bottom: Story = {
    args: {
        content: 'Tooltip on bottom',
        children: <button className="rounded bg-blue-500 px-4 py-2 text-white">Hover me</button>,
        position: 'bottom',
    },
};

export const Left: Story = {
    args: {
        content: 'Tooltip on left',
        children: <button className="rounded bg-blue-500 px-4 py-2 text-white">Hover me</button>,
        position: 'left',
    },
};

export const Right: Story = {
    args: {
        content: 'Tooltip on right',
        children: <button className="rounded bg-blue-500 px-4 py-2 text-white">Hover me</button>,
        position: 'right',
    },
};

export const WithDelay: Story = {
    args: {
        content: 'Appears after 800ms',
        children: <button className="rounded bg-blue-500 px-4 py-2 text-white">Hover (delayed)</button>,
        position: 'top',
        delay: 800,
    },
};

export const LongContent: Story = {
    args: {
        content:
            'This is a much longer tooltip message that should wrap inside the tooltip panel without overflowing.',
        children: <button className="rounded bg-blue-500 px-4 py-2 text-white">Long tooltip</button>,
        position: 'top',
    },
};

export const RichContent: Story = {
    args: {
        content: (
            <span>
                <strong>Bold</strong> and <em>italic</em> text
            </span>
        ),
        children: <button className="rounded bg-blue-500 px-4 py-2 text-white">Rich content</button>,
        position: 'bottom',
    },
};
