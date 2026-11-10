import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { FoldLegend } from './FoldLegend';

const meta = {
    title: 'Components/Step/FoldLegend',
    component: FoldLegend,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof FoldLegend>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
