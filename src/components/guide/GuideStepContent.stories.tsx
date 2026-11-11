import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { paperCup } from '../../content/guides/paperCup';
import { GuideStepContent } from './GuideStepContent';

const meta = {
    title: 'Components/Guide/GuideStepContent',
    component: GuideStepContent,
    decorators: [AppProvidersDecorator],
    parameters: { layout: 'fullscreen', route: '/guide/cup/step/1' },
    tags: ['autodocs'],
    args: { guide: paperCup, stepNumber: 1 },
} satisfies Meta<typeof GuideStepContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstStep: Story = {};
export const MiddleStep: Story = {
    args: { stepNumber: 2 },
    parameters: { route: '/guide/cup/step/2' },
};
export const LastStep: Story = {
    args: { stepNumber: paperCup.steps.length },
    parameters: { route: `/guide/cup/step/${paperCup.steps.length}` },
};
