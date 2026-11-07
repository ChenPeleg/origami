import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppModal } from './AppModal';

describe('AppModal', () => {
    it('does not render content when closed', () => {
        render(
            <AppModal isOpen={false} onClose={vi.fn()} title="Confirm">
                <p>Modal content</p>
            </AppModal>
        );

        expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
    });

    it('renders content when open', async () => {
        render(
            <AppModal isOpen onClose={vi.fn()} title="Confirm">
                <p>Modal content</p>
            </AppModal>
        );

        expect(await screen.findByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText('Confirm')).toBeInTheDocument();
        expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('calls onClose when the close button is clicked', async () => {
        const handleClose = vi.fn();
        const user = userEvent.setup();

        render(
            <AppModal isOpen onClose={handleClose} title="Confirm">
                <p>Modal content</p>
            </AppModal>
        );

        await user.click(screen.getByRole('button', { name: 'Close dialog' }));

        expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose on Escape key', async () => {
        const handleClose = vi.fn();
        const user = userEvent.setup();

        render(
            <AppModal isOpen onClose={handleClose} title="Confirm">
                <p>Modal content</p>
            </AppModal>
        );

        await user.keyboard('{Escape}');

        expect(handleClose).toHaveBeenCalled();
    });
});
