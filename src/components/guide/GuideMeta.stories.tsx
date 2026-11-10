import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { paperCup } from '../../content/guides/paperCup';
import { GuideMeta } from './GuideMeta';

const meta = {
    title: 'Components/Guide/GuideMeta',
    component: GuideMeta,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: { guide: paperCup },
} satisfies Meta<typeof GuideMeta>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
