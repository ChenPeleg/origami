import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProgressBar } from './AppProgressBar';

const meta = {
    title: 'Common/AppProgressBar',
    component: AppProgressBar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        value: { control: 'number', description: 'Current value' },
        max: { control: 'number', description: 'Largest value' },
        min: { control: 'number', description: 'Smallest value' },
        label: { control: 'text', description: 'Accessible name' },
    },
    args: { value: 2, max: 5, label: 'Step 2 of 5' },
    render: (args) => (
        <div className="w-96">
            <AppProgressBar {...args} />
        </div>
    ),
} satisfies Meta<typeof AppProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Start: Story = {
    args: { value: 1, label: 'Step 1 of 5' },
};

export const Complete: Story = {
    args: { value: 5, label: 'Step 5 of 5' },
};
