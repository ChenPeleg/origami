import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { paperCup } from '../../content/guides/paperCup';
import { puppyFace } from '../../content/guides/puppyFace';
import { GuideGridCard } from './GuideGridCard';

const meta = {
    title: 'Components/Guide/GuideCard',
    component: GuideGridCard,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        guide: paperCup,
        to: '/guide/cup',
        resumeStep: null,
        tapes: [
            { pattern: 'dots', position: 'left' },
            { pattern: 'bands', position: 'right' },
        ],
    },
    render: (args) => (
        <div className="max-w-sm pt-4">
            <GuideGridCard {...args} />
        </div>
    ),
} satisfies Meta<typeof GuideGridCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotStarted: Story = {};

/** A started guide shows the step to continue from. */
export const WithProgress: Story = {
    args: {
        guide: puppyFace,
        to: '/guide/puppy',
        resumeStep: 3,
        tapes: [{ pattern: 'stripes', position: 'center' }],
    },
};
