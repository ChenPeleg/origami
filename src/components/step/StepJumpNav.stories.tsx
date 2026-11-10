import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { ServicesResolver } from '../../services/provider/ServiceResolverClass';
import { GuideFlowService } from '../../services/GuideFlow.service';
import { paperCup } from '../../content/guides/paperCup';

const flowService = new ServicesResolver([GuideFlowService]).getService(
    GuideFlowService
);
import { StepJumpNav } from './StepJumpNav';

const meta = {
    title: 'Components/Step/StepJumpNav',
    component: StepJumpNav,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: { items: flowService.getStepView(paperCup, 3).jumpItems },
} satisfies Meta<typeof StepJumpNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
