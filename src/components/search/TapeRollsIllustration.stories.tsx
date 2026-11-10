import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { TapeRollsIllustration } from './TapeRollsIllustration';

const meta = {
    title: 'Components/Search/TapeRollsIllustration',
    component: TapeRollsIllustration,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: { className: 'w-[250px]' },
} satisfies Meta<typeof TapeRollsIllustration>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
