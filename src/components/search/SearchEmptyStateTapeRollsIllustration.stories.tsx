import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { SearchEmptyStateTapeRollsIllustration } from './SearchEmptyStateTapeRollsIllustration';

const meta = {
    title: 'Components/Search/TapeRollsIllustration',
    component: SearchEmptyStateTapeRollsIllustration,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: { className: 'w-[250px]' },
} satisfies Meta<typeof SearchEmptyStateTapeRollsIllustration>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
