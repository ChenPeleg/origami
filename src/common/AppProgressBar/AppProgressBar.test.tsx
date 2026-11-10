import { render, screen } from '@testing-library/react';
import { AppProgressBar } from './AppProgressBar';

describe('AppProgressBar', () => {
    it('exposes the progress to assistive technology', () => {
        render(<AppProgressBar value={2} max={5} label="Step 2 of 5" />);

        const bar = screen.getByRole('progressbar', { name: 'Step 2 of 5' });
        expect(bar).toHaveAttribute('aria-valuenow', '2');
        expect(bar).toHaveAttribute('aria-valuemin', '0');
        expect(bar).toHaveAttribute('aria-valuemax', '5');
    });

    it('fills the bar in proportion to the value', () => {
        render(<AppProgressBar value={2} max={5} label="Progress" />);

        expect(screen.getByTestId('progress-fill')).toHaveStyle({
            width: '40%',
        });
    });

    it('takes a custom minimum into account', () => {
        render(<AppProgressBar value={3} min={1} max={5} label="Progress" />);

        expect(screen.getByTestId('progress-fill')).toHaveStyle({
            width: '50%',
        });
    });

    it('never fills less than 0% or more than 100%', () => {
        const { rerender } = render(
            <AppProgressBar value={9} max={5} label="Progress" />
        );
        expect(screen.getByTestId('progress-fill')).toHaveStyle({
            width: '100%',
        });

        rerender(<AppProgressBar value={-2} max={5} label="Progress" />);
        expect(screen.getByTestId('progress-fill')).toHaveStyle({
            width: '0%',
        });

        rerender(<AppProgressBar value={0} max={0} label="Progress" />);
        expect(screen.getByTestId('progress-fill')).toHaveStyle({
            width: '0%',
        });
    });
});
