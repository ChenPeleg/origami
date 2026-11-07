import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppInput } from './AppInput';

describe('AppInput', () => {
    it('renders with placeholder', () => {
        render(<AppInput placeholder="Enter title" />);

        expect(screen.getByPlaceholderText('Enter title')).toBeInTheDocument();
    });

    it('accepts typed input and fires onChange', async () => {
        const handleChange = vi.fn();
        const user = userEvent.setup();

        render(<AppInput aria-label="Title" onChange={handleChange} />);

        const input = screen.getByLabelText('Title');
        await user.type(input, 'Activity');

        expect(input).toHaveValue('Activity');
        expect(handleChange).toHaveBeenCalled();
    });

    it('renders as disabled when disabled is true', () => {
        render(<AppInput aria-label="Title" disabled />);

        expect(screen.getByLabelText('Title')).toBeDisabled();
    });

    it('accepts a custom className', () => {
        render(<AppInput aria-label="Title" className="custom-input" />);

        expect(screen.getByLabelText('Title')).toHaveClass('custom-input');
    });
});
