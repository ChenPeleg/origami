import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppSelect } from './AppSelect';

const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
];

describe('AppSelect', () => {
    it('renders the selected option label', () => {
        render(
            <AppSelect value="banana" onChange={vi.fn()} options={options} />
        );

        expect(
            screen.getByRole('button', { name: 'Banana' })
        ).toBeInTheDocument();
    });

    it('opens on click and shows all options', async () => {
        const user = userEvent.setup();

        render(<AppSelect value="apple" onChange={vi.fn()} options={options} />);

        await user.click(screen.getByRole('button', { name: 'Apple' }));

        for (const option of options) {
            expect(
                await screen.findByRole('option', { name: option.label })
            ).toBeInTheDocument();
        }
    });

    it('fires onChange when a new option is selected', async () => {
        const handleChange = vi.fn();
        const user = userEvent.setup();

        render(
            <AppSelect value="apple" onChange={handleChange} options={options} />
        );

        await user.click(screen.getByRole('button', { name: 'Apple' }));
        await user.click(await screen.findByRole('option', { name: 'Orange' }));

        expect(handleChange).toHaveBeenCalledWith('orange');
    });

    it('is not interactive when disabled', async () => {
        const handleChange = vi.fn();
        const user = userEvent.setup();

        render(
            <AppSelect
                value="banana"
                onChange={handleChange}
                options={options}
                disabled
            />
        );

        const button = screen.getByRole('button', { name: 'Banana' });
        expect(button).toBeDisabled();

        await user.click(button);

        expect(screen.queryByRole('option', { name: 'Apple' })).not.toBeInTheDocument();
        expect(handleChange).not.toHaveBeenCalled();
    });
});
