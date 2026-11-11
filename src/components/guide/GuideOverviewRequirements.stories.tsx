import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { paperCup } from '../../content/guides/paperCup';
import { GuideOverviewRequirements } from './GuideOverviewRequirements';

const meta = {
    title: 'Components/Guide/RequirementsList',
    component: GuideOverviewRequirements,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: { requirementKeys: paperCup.requirementKeys },
} satisfies Meta<typeof GuideOverviewRequirements>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
