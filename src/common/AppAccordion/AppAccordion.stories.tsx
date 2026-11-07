import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppAccordion } from './AppAccordion';

const meta = {
    title: 'Common/AppAccordion',
    component: AppAccordion,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof AppAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
    {
        id: '1',
        title: 'What is an accordion?',
        content: (
            <p>
                An accordion is a UI component that expands to reveal hidden content and collapses to hide
                it again.
            </p>
        ),
    },
    {
        id: '2',
        title: 'How does keyboard navigation work?',
        content: (
            <p>
                Press <kbd>Enter</kbd> or <kbd>Space</kbd> on the header button to toggle a section.
                <kbd>Tab</kbd> moves between sections.
            </p>
        ),
    },
    {
        id: '3',
        title: 'Can I have custom content?',
        content: (
            <div className="space-y-1">
                <p>Yes! Content can be any React node:</p>
                <ul className="list-disc pl-4 text-sm">
                    <li>Text</li>
                    <li>Images</li>
                    <li>Forms</li>
                </ul>
            </div>
        ),
    },
];

export const Default: Story = {
    args: {
        items: sampleItems,
    },
};

export const DefaultOpen: Story = {
    args: {
        items: sampleItems,
        defaultOpen: ['1', '3'],
    },
};

export const WithIcons: Story = {
    args: {
        items: sampleItems.map((item) => ({
            ...item,
            icon: (
                <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        })),
    },
};

export const AllowMultiple: Story = {
    args: {
        items: sampleItems,
        allowMultiple: true,
        defaultOpen: ['1', '2'],
    },
};

export const LongContent: Story = {
    args: {
        items: [
            {
                id: '1',
                title: 'Long content example',
                content: (
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                ),
            },
            {
                id: '2',
                title: 'Short content',
                content: <p>Brief answer.</p>,
            },
        ],
    },
};
