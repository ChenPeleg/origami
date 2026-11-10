import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppButton } from './AppButton';

describe('AppButton', () => {
    it('renders a primary button by default and handles clicks', async () => {
        const handleClick = vi.fn();
        const user = userEvent.setup();
        render(<AppButton onClick={handleClick}>Next</AppButton>);

        const button = screen.getByRole('button', { name: 'Next' });
        await user.click(button);

        expect(button).toHaveClass('bg-coral', 'shadow-cut', 'min-h-12');
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies the variant and size', () => {
        render(
            <AppButton variant="secondary" size="sm">
                Back
            </AppButton>
        );

        const button = screen.getByRole('button', { name: 'Back' });
        expect(button).toHaveClass('bg-scrap', 'min-h-11');
        expect(button).not.toHaveClass('bg-coral');
    });

    it('renders as a link through the "as" prop', () => {
        render(
            <AppButton as="a" href="/guide/cup">
                Start folding
            </AppButton>
        );

        expect(
            screen.getByRole('link', { name: 'Start folding' })
        ).toHaveAttribute('href', '/guide/cup');
    });

    it('does not fire clicks when disabled', async () => {
        const handleClick = vi.fn();
        const user = userEvent.setup();
        render(
            <AppButton disabled onClick={handleClick}>
                Back
            </AppButton>
        );

        await user.click(screen.getByRole('button', { name: 'Back' }));

        expect(handleClick).not.toHaveBeenCalled();
    });
});
