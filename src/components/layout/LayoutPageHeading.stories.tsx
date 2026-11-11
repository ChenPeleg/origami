import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { LayoutPageHeading } from './LayoutPageHeading';

const meta = {
    title: 'Components/Layout/PageHeading',
    component: LayoutPageHeading,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: { title: 'Pick something to fold' },
} satisfies Meta<typeof LayoutPageHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {};

export const Step: Story = {
    args: { title: 'Step 2 of 5', size: 'step' },
};
