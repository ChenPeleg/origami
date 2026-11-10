import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { paperCup } from '../../content/guides/paperCup';
import { puppyFace } from '../../content/guides/puppyFace';
import { GuideCover } from './GuideCover';

const meta = {
    title: 'Components/Guide/GuideCover',
    component: GuideCover,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: { guide: paperCup },
    render: (args) => (
        <div className="max-w-md">
            <GuideCover {...args} />
        </div>
    ),
} satisfies Meta<typeof GuideCover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PaperCup: Story = {};

export const PuppyFace: Story = {
    args: { guide: puppyFace },
};
