import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppPaperScrap } from './AppPaperScrap';

const meta = {
    title: 'Common/AppPaperScrap',
    component: AppPaperScrap,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        tapes: {
            control: 'object',
            description: 'Washi tapes on the top edge',
        },
    },
    args: { children: 'One square sheet of paper is all you need.' },
    render: (args) => (
        <div className="bg-table p-10">
            <AppPaperScrap {...args} className="w-80" />
        </div>
    ),
} satisfies Meta<typeof AppPaperScrap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};

export const OneTape: Story = {
    args: { tapes: [{ pattern: 'stripes', position: 'center' }] },
};

export const TwoTapes: Story = {
    args: {
        tapes: [
            { pattern: 'dots', position: 'left' },
            { pattern: 'bands', position: 'right' },
        ],
    },
};

/** Rendered as a link through the `as` prop, like a catalog card. */
export const AsLink: Story = {
    render: () => (
        <div className="bg-table p-10">
            <AppPaperScrap
                as="a"
                href="#"
                tapes={[{ pattern: 'dots', position: 'center' }]}
                className="block w-80 no-underline"
            >
                Paper Cup
            </AppPaperScrap>
        </div>
    ),
};
