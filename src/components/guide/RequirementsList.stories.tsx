import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { paperCup } from '../../content/guides/paperCup';
import { RequirementsList } from './RequirementsList';

const meta = {
    title: 'Components/Guide/RequirementsList',
    component: RequirementsList,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: { requirementKeys: paperCup.requirementKeys },
} satisfies Meta<typeof RequirementsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
