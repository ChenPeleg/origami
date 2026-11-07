import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { AppFormField } from '../../../src/common/AppFormField/AppFormField';

describe('AppFormField', () => {
    it('renders the label text', () => {
        render(
            <AppFormField label="Full Name">
                <input type="text" />
            </AppFormField>,
        );
        expect(screen.getByText('Full Name')).toBeTruthy();
    });

    it('renders a <label> element', () => {
        render(
            <AppFormField label="Email">
                <input type="email" />
            </AppFormField>,
        );
        const labelEl = screen.getByText('Email').closest('label');
        expect(labelEl).not.toBeNull();
        expect(labelEl?.tagName.toLowerCase()).toBe('label');
    });

    it('renders children inside the field', () => {
        render(
            <AppFormField label="Notes">
                <textarea data-testid="notes-input" />
            </AppFormField>,
        );
        expect(screen.getByTestId('notes-input')).toBeTruthy();
    });

    it('renders ReactNode as the label', () => {
        render(
            <AppFormField
                label={
                    <span>
                        Name <abbr title="required">*</abbr>
                    </span>
                }
            >
                <input type="text" />
            </AppFormField>,
        );
        expect(screen.getByText('*')).toBeTruthy();
    });

    it('renders multiple children', () => {
        render(
            <AppFormField label="Options">
                <input data-testid="option-a" type="radio" />
                <input data-testid="option-b" type="radio" />
            </AppFormField>,
        );
        expect(screen.getByTestId('option-a')).toBeTruthy();
        expect(screen.getByTestId('option-b')).toBeTruthy();
    });
});
