import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppFormField } from './AppFormField';
import { AppInput } from '../AppInput/AppInput';
import { AppTextArea } from '../AppTextArea/AppTextArea';
import { AppDateInput } from '../AppDateInput/AppDateInput';
import { AppSelect } from '../AppSelect/AppSelect';

const meta = {
    title: 'Common/AppFormField',
    component: AppFormField,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: 'text',
            description: 'Label text for the form field',
        },
        required: {
            control: 'boolean',
            description: 'Whether to show the required indicator',
        },
        helpText: {
            control: 'text',
            description: 'Optional help text shown below the field',
        },
        error: {
            control: 'text',
            description: 'Optional validation error message shown below the field',
        },
    },
} satisfies Meta<typeof AppFormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInput: Story = {
    args: {
        label: 'Full Name',
        children: <AppInput placeholder="Enter your full name..." />,
    },
};

export const WithTextArea: Story = {
    args: {
        label: 'Description',
        children: <AppTextArea placeholder="Enter description..." rows={4} />,
    },
};

export const WithDateInput: Story = {
    args: {
        label: 'Birth Date',
        children: <AppDateInput />,
    },
};

export const WithSelect: Story = {
    args: {
        label: 'Country',
        children: (
            <AppSelect
                value="il"
                onChange={() => {}}
                options={[
                    { value: 'us', label: 'United States' },
                    { value: 'uk', label: 'United Kingdom' },
                    { value: 'il', label: 'Israel' },
                ]}
            />
        ),
    },
};

export const Required: Story = {
    args: {
        label: 'Email Address',
        required: true,
        children: <AppInput type="email" placeholder="Enter your email..." />,
    },
};

export const WithHelpText: Story = {
    args: {
        label: 'Password',
        helpText: 'Must be at least 8 characters long',
        children: <AppInput type="password" placeholder="Enter password..." />,
    },
};

export const WithError: Story = {
    args: {
        label: 'Username',
        error: 'Username is already taken',
        children: (
            <AppInput
                placeholder="Enter username..."
                className="w-full rounded-lg border border-red-500 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-red-500"
            />
        ),
    },
};

export const MultipleFields: Story = {
    args: {
        label: '',
        children: null,
    },
    render: () => (
        <div className="w-96 space-y-4">
            <AppFormField label="First Name">
                <AppInput placeholder="Enter first name..." />
            </AppFormField>
            <AppFormField label="Last Name">
                <AppInput placeholder="Enter last name..." />
            </AppFormField>
            <AppFormField label="Email">
                <AppInput type="email" placeholder="Enter email..." />
            </AppFormField>
            <AppFormField label="Country">
                <AppSelect
                    value="us"
                    onChange={() => {}}
                    options={[
                        { value: 'us', label: 'United States' },
                        { value: 'uk', label: 'United Kingdom' },
                        { value: 'il', label: 'Israel' },
                    ]}
                />
            </AppFormField>
        </div>
    ),
};
