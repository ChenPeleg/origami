import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppTextArea } from './AppTextArea';

describe('AppTextArea', () => {
    it('renders with placeholder', () => {
        render(<AppTextArea placeholder="Enter description" />);

        expect(
            screen.getByPlaceholderText('Enter description')
        ).toBeInTheDocument();
    });

    it('fires onChange on typing', async () => {
        const handleChange = vi.fn();
        const user = userEvent.setup();

        render(<AppTextArea aria-label="Description" onChange={handleChange} />);

        const textArea = screen.getByLabelText('Description');
        await user.type(textArea, 'Longer description');

        expect(textArea).toHaveValue('Longer description');
        expect(handleChange).toHaveBeenCalled();
    });

    it('respects the rows prop', () => {
        render(<AppTextArea aria-label="Description" rows={6} />);

        expect(screen.getByLabelText('Description')).toHaveAttribute(
            'rows',
            '6'
        );
    });

    it('renders as disabled', () => {
        render(<AppTextArea aria-label="Description" disabled />);

        expect(screen.getByLabelText('Description')).toBeDisabled();
    });
});
