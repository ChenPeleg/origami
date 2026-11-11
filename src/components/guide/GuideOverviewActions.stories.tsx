import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { fn } from 'storybook/test';
import { ServicesResolver } from '../../services/provider/ServiceResolverClass';
import { GuideFlowService } from '../../services/GuideFlow.service';
import { paperCup } from '../../content/guides/paperCup';

const flowService = new ServicesResolver([GuideFlowService]).getService(
    GuideFlowService
);
import { GuideOverviewActions } from './GuideOverviewActions';

const meta = {
    title: 'Components/Guide/GuideActions',
    component: GuideOverviewActions,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        actions: flowService.getOverviewActions(paperCup, null),
        onRestart: fn(),
    },
} satisfies Meta<typeof GuideOverviewActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Start: Story = {};

export const ContinueAndStartOver: Story = {
    args: { actions: flowService.getOverviewActions(paperCup, 3) },
};
