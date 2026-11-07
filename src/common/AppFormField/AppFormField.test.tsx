import { render, screen } from '@testing-library/react';
import { AppFormField } from './AppFormField';
import { AppInput } from '../AppInput/AppInput';

describe('AppFormField', () => {
    it('renders the label and child element', () => {
        render(
            <AppFormField label="Full name" htmlFor="full-name">
                <AppInput id="full-name" />
            </AppFormField>
        );

        expect(screen.getByText('Full name')).toBeInTheDocument();
        expect(screen.getByLabelText('Full name')).toBeInTheDocument();
    });

    it('renders a required indicator', () => {
        render(
            <AppFormField label="Email" required>
                <AppInput />
            </AppFormField>
        );

        expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('renders help text', () => {
        render(
            <AppFormField label="Password" helpText="At least 8 characters">
                <AppInput type="password" />
            </AppFormField>
        );

        expect(screen.getByText('At least 8 characters')).toBeInTheDocument();
    });

    it('renders an error message', () => {
        render(
            <AppFormField label="Username" error="Username is already taken">
                <AppInput />
            </AppFormField>
        );

        expect(
            screen.getByText('Username is already taken')
        ).toBeInTheDocument();
    });
});
