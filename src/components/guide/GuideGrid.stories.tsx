import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { paperCup } from '../../content/guides/paperCup';
import { puppyFace } from '../../content/guides/puppyFace';
import { GuideGrid } from './GuideGrid';

const meta = {
    title: 'Components/Guide/GuideGrid',
    component: GuideGrid,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: { guides: [paperCup, puppyFace], resumeSteps: {} },
    render: (args) => (
        <div className="pt-4">
            <GuideGrid {...args} />
        </div>
    ),
} satisfies Meta<typeof GuideGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithProgress: Story = {
    args: { resumeSteps: { puppy: 2 } },
};
