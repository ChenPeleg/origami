import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { GuideStepContentFoldLegend } from './GuideStepContentFoldLegend';

const meta = {
    title: 'Components/Step/FoldLegend',
    component: GuideStepContentFoldLegend,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof GuideStepContentFoldLegend>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
