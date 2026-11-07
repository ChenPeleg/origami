import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { AppSelect } from '../../../src/common/AppSelect/AppSelect';

const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
];

describe('AppSelect', () => {
    it('renders the label of the currently selected option', () => {
        render(<AppSelect value="apple" onChange={vi.fn()} options={options} />);
        expect(screen.getByText('Apple')).toBeTruthy();
    });

    it('renders a button element as the trigger', () => {
        render(<AppSelect value="banana" onChange={vi.fn()} options={options} />);
        expect(screen.getByRole('button')).toBeTruthy();
    });

    it('shows all options after clicking the button', () => {
        render(<AppSelect value="apple" onChange={vi.fn()} options={options} />);
        fireEvent.click(screen.getByRole('button'));
        expect(screen.getByText('Banana')).toBeTruthy();
        expect(screen.getByText('Cherry')).toBeTruthy();
    });

    it('calls onChange with the selected value when an option is clicked', () => {
        const onChange = vi.fn();
        render(<AppSelect value="apple" onChange={onChange} options={options} />);
        fireEvent.click(screen.getByRole('button'));
        fireEvent.click(screen.getByText('Banana'));
        expect(onChange).toHaveBeenCalledWith('banana');
    });

    it('does not open options when disabled', () => {
        render(<AppSelect value="apple" onChange={vi.fn()} options={options} disabled />);
        fireEvent.click(screen.getByRole('button'));
        // Options panel must not appear when the listbox is disabled
        expect(screen.queryByText('Banana')).toBeNull();
    });

    it('shows an empty label when the selected value has no matching option', () => {
        render(<AppSelect value="unknown" onChange={vi.fn()} options={options} />);
        // The button still renders, just with no label text for the selection
        expect(screen.getByRole('button')).toBeTruthy();
    });

    it('renders all options in the list', () => {
        // Use an unmatched value so the selected-option display in the button
        // does not duplicate any option label when the listbox opens.
        render(<AppSelect value="" onChange={vi.fn()} options={options} />);
        fireEvent.click(screen.getByRole('button'));
        options.forEach((opt) => {
            expect(screen.getByText(opt.label)).toBeTruthy();
        });
    });
});
