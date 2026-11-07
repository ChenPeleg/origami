import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * Example component demonstrating RTL/LTR direction switching
 */
const DirectionExample = () => {
    return (
        <div className="space-y-6 rounded-lg border-2 border-gray-300 bg-white p-8">
            <div>
                <h2 className="mb-2 text-xl font-bold text-gray-900">
                    Direction Switching Demo
                </h2>
                <p className="text-sm text-gray-600">
                    Use the Direction toolbar to switch between LTR, RTL, and Auto modes.
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <h3 className="mb-2 font-semibold text-gray-900">Text Alignment</h3>
                    <div className="space-y-2 rounded bg-gray-50 p-4">
                        <p className="text-start">Text aligned to start (changes with direction)</p>
                        <p className="text-end">Text aligned to end (changes with direction)</p>
                        <p className="text-left">Text aligned to left (always left)</p>
                        <p className="text-right">Text aligned to right (always right)</p>
                    </div>
                </div>

                <div>
                    <h3 className="mb-2 font-semibold text-gray-900">Margins</h3>
                    <div className="space-y-2 rounded bg-gray-50 p-4">
                        <div className="ms-8 rounded bg-blue-500 p-2 text-white">
                            Margin start (ms-8) - changes with direction
                        </div>
                        <div className="me-8 rounded bg-green-500 p-2 text-white">
                            Margin end (me-8) - changes with direction
                        </div>
                        <div className="ml-8 rounded bg-purple-500 p-2 text-white">
                            Margin left (ml-8) - always left
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="mb-2 font-semibold text-gray-900">Multilingual Content</h3>
                    <div className="space-y-2 rounded bg-gray-50 p-4">
                        <p className="text-gray-900">English: Hello World</p>
                        <p className="text-gray-900">עברית: שלום עולם</p>
                        <p className="text-gray-900">العربية: مرحبا بالعالم</p>
                    </div>
                </div>

                <div>
                    <h3 className="mb-2 font-semibold text-gray-900">Flex Layout</h3>
                    <div className="flex gap-2 rounded bg-gray-50 p-4">
                        <div className="rounded bg-red-500 px-4 py-2 text-white">First</div>
                        <div className="rounded bg-orange-500 px-4 py-2 text-white">Second</div>
                        <div className="rounded bg-yellow-500 px-4 py-2 text-white">Third</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const meta = {
    title: 'Examples/Direction Demo',
    component: DirectionExample,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
This component demonstrates how the global direction switcher affects different CSS properties.

**How to use:**
1. Look for the "Direction" control in the Storybook toolbar
2. Switch between Auto, LTR, and RTL modes
3. Observe how different elements respond to direction changes

**Key observations:**
- \`text-start\` and \`text-end\` adapt to direction
- \`ms-*\` (margin-start) and \`me-*\` (margin-end) adapt to direction
- \`text-left\`, \`text-right\`, \`ml-*\`, \`mr-*\` remain fixed
- Flex layouts automatically reverse in RTL mode
                `,
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof DirectionExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInstructions: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Try switching the direction using the toolbar at the top of the Storybook page. Notice how the layout, text alignment, and margins adjust automatically.',
            },
        },
    },
};

