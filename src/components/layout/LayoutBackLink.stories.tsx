import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { LayoutBackLink } from './LayoutBackLink';

const meta = {
    title: 'Components/Layout/BackLink',
    component: LayoutBackLink,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: { to: '/', children: 'All guides' },
} satisfies Meta<typeof LayoutBackLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
