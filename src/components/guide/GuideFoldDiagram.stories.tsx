import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvidersDecorator } from '../../../.storybook/decorators/AppProvidersDecorator';
import { paperCup } from '../../content/guides/paperCup';
import { puppyFace } from '../../content/guides/puppyFace';
import { GuideFoldDiagram } from './GuideFoldDiagram';

const meta = {
    title: 'Components/Guide/FoldDiagram',
    component: GuideFoldDiagram,
    decorators: [AppProvidersDecorator],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        diagram: paperCup.steps[1].diagram,
        paperColor: paperCup.paperColor,
        flapColor: paperCup.flapColor,
        label: 'Fold diagram: fold the right corner across to the left edge.',
    },
    render: (args) => (
        <div className="max-w-md">
            <GuideFoldDiagram {...args} />
        </div>
    ),
} satisfies Meta<typeof GuideFoldDiagram>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A valley fold (dashed line), a direction arrow and a target dot. */
export const ValleyFold: Story = {};

/** A mountain fold (dash-dot line) and a dotted "fold behind" arrow. */
export const MountainFoldBehind: Story = {
    args: {
        diagram: paperCup.steps[4].diagram,
        label: 'Fold diagram: fold the other top corner down behind.',
    },
};

export const FinishedPuppy: Story = {
    args: {
        diagram: puppyFace.cover,
        paperColor: puppyFace.paperColor,
        flapColor: puppyFace.flapColor,
        label: 'A folded paper puppy face.',
    },
};
