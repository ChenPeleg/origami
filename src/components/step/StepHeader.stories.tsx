import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { ServicesResolver } from '../../services/provider/ServiceResolverClass';
import { GuideFlowService } from '../../services/GuideFlow.service';
import { paperCup } from '../../content/guides/paperCup';

const flowService = new ServicesResolver([GuideFlowService]).getService(
    GuideFlowService
);
import { StepHeader } from './StepHeader';

const meta = {
    title: 'Components/Step/StepHeader',
    component: StepHeader,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        stepView: flowService.getStepView(paperCup, 2),
        guideName: paperCup.name.en,
    },
} satisfies Meta<typeof StepHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Middle: Story = {};

export const LastStep: Story = {
    args: { stepView: flowService.getStepView(paperCup, 5) },
};
