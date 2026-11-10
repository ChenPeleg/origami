import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppWashiTape } from './AppWashiTape';

const meta = {
    title: 'Common/AppWashiTape',
    component: AppWashiTape,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        pattern: {
            control: 'select',
            options: ['stripes', 'dots', 'bands'],
            description: 'One of the three washi patterns',
        },
        position: {
            control: 'select',
            options: ['left', 'center', 'right'],
            description: 'Place on the top edge of the parent',
        },
    },
    args: { pattern: 'stripes', position: 'center' },
    render: (args) => (
        <div className="bg-scrap shadow-scrap relative mt-6 h-24 w-80">
            <AppWashiTape {...args} />
        </div>
    ),
} satisfies Meta<typeof AppWashiTape>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Stripes: Story = {};

export const Dots: Story = {
    args: { pattern: 'dots', position: 'left' },
};

export const Bands: Story = {
    args: { pattern: 'bands', position: 'right' },
};
