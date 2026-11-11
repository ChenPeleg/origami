import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { paperCup } from '../../content/guides/paperCup';
import { GuideStepContentInstruction } from './GuideStepContentInstruction';

const meta = {
    title: 'Components/Step/StepInstruction',
    component: GuideStepContentInstruction,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        instruction: paperCup.steps[1].instruction.en,
        tip: paperCup.steps[1].tip.en,
    },
} satisfies Meta<typeof GuideStepContentInstruction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
