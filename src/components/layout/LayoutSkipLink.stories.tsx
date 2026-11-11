import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { LayoutSkipLink } from './LayoutSkipLink';

const meta = {
    title: 'Components/Layout/SkipLink',
    component: LayoutSkipLink,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: { targetId: 'main' },
} satisfies Meta<typeof LayoutSkipLink>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The link is visible only while it has keyboard focus: press Tab. */
export const Default: Story = {
    render: (args) => (
        <div className="relative min-h-24">
            <LayoutSkipLink {...args} />
            <main id="main" tabIndex={-1} className="pt-16">
                Main content
            </main>
        </div>
    ),
};
