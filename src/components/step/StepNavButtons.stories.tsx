import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { ServicesResolver } from '../../services/provider/ServiceResolverClass';
import { GuideFlowService } from '../../services/GuideFlow.service';
import { paperCup } from '../../content/guides/paperCup';

const flowService = new ServicesResolver([GuideFlowService]).getService(
    GuideFlowService
);
import { StepNavButtons } from './StepNavButtons';

const meta = {
    title: 'Components/Step/StepNavButtons',
    component: StepNavButtons,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: { stepView: flowService.getStepView(paperCup, 2) },
} satisfies Meta<typeof StepNavButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Middle: Story = {};

/** Back is disabled on the first step. */
export const FirstStep: Story = {
    args: { stepView: flowService.getStepView(paperCup, 1) },
};

/** Next becomes Finish on the last step. */
export const LastStep: Story = {
    args: { stepView: flowService.getStepView(paperCup, 5) },
};
