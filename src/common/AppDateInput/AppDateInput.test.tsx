import { fireEvent, render, screen } from '@testing-library/react';
import { AppDateInput } from './AppDateInput';

describe('AppDateInput', () => {
    it('renders with a date value', () => {
        render(
            <AppDateInput
                aria-label="Start date"
                value="2026-05-15"
                readOnly
            />
        );

        expect(screen.getByLabelText('Start date')).toHaveValue('2026-05-15');
    });

    it('fires onChange on value change', () => {
        const handleChange = vi.fn();

        render(<AppDateInput aria-label="Start date" onChange={handleChange} />);

        fireEvent.change(screen.getByLabelText('Start date'), {
            target: { value: '2026-05-20' },
        });

        expect(handleChange).toHaveBeenCalled();
    });

    it('renders as disabled', () => {
        render(<AppDateInput aria-label="Start date" disabled />);

        expect(screen.getByLabelText('Start date')).toBeDisabled();
    });
});
