import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { paperCup } from '../../content/guides/paperCup';
import { puppyFace } from '../../content/guides/puppyFace';
import { GuideDoneContent } from './GuideDoneContent';

const meta = {
    title: 'Components/Guide/GuideDoneContent',
    component: GuideDoneContent,
    decorators: [AppProvidersDecorator],
    parameters: { layout: 'fullscreen', route: '/guide/cup/done' },
    tags: ['autodocs'],
    args: { guide: paperCup },
} satisfies Meta<typeof GuideDoneContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PaperCup: Story = {};
export const PuppyFace: Story = {
    args: { guide: puppyFace },
    parameters: { route: '/guide/puppy/done' },
};
