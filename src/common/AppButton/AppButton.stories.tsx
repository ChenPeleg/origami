import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { AppButton } from './AppButton';

const meta = {
    title: 'Common/AppButton',
    component: AppButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'danger', 'ghost', 'link'],
            description: 'Visual style',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Height, padding and font size',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the button is disabled',
        },
    },
    args: { children: 'Start folding', onClick: fn() },
} satisfies Meta<typeof AppButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    play: async ({ args, canvasElement }) => {
        const canvas = within(canvasElement);

        await userEvent.click(canvas.getByRole('button'));
        await expect(args.onClick).toHaveBeenCalledTimes(1);
    },
};

export const Secondary: Story = {
    args: { variant: 'secondary', children: 'Back' },
};

export const Danger: Story = {
    args: { variant: 'danger', children: 'Delete' },
};

export const Ghost: Story = {
    args: { variant: 'ghost', children: 'Cancel' },
};

export const LinkStyle: Story = {
    args: { variant: 'link', children: 'Read more' },
};

export const Small: Story = {
    args: { variant: 'secondary', size: 'sm', children: 'English' },
};

export const Large: Story = {
    args: { size: 'lg' },
};

export const Disabled: Story = {
    args: { variant: 'secondary', disabled: true, children: 'Back' },
};

/** Rendered as a link through the `as` prop. */
export const AsLink: Story = {
    render: () => (
        <AppButton as="a" href="#" variant="primary">
            Choose another guide
        </AppButton>
    ),
};
