import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppToastContainer } from './AppToastContainer';
import { ToastProvider } from './ToastContext';
import { useToast } from './useToast';

function ToastHarness() {
    const { showSuccess, showInfo } = useToast();

    return (
        <>
            <button
                type="button"
                onClick={() => showSuccess('Saved successfully', 1000)}
            >
                Show auto dismiss
            </button>
            <button
                type="button"
                onClick={() => showInfo('Persistent message', 0)}
            >
                Show persistent
            </button>
            <AppToastContainer />
        </>
    );
}

function renderToastHarness() {
    return render(
        <ToastProvider>
            <ToastHarness />
        </ToastProvider>
    );
}

describe('AppToast', () => {
    it('shows a toast when showSuccess is called', async () => {
        const user = userEvent.setup();

        renderToastHarness();
        await user.click(screen.getByRole('button', { name: 'Show auto dismiss' }));

        expect(await screen.findByRole('alert')).toHaveTextContent(
            'Saved successfully'
        );
    });

    it('can be manually dismissed', async () => {
        const user = userEvent.setup();

        renderToastHarness();
        await user.click(screen.getByRole('button', { name: 'Show persistent' }));
        await user.click(
            await screen.findByRole('button', {
                name: 'Dismiss notification',
            })
        );

        await waitFor(() => {
            expect(
                screen.queryByText('Persistent message')
            ).not.toBeInTheDocument();
        });
    });

    it('auto-dismisses after the provided duration', async () => {
        vi.useFakeTimers();

        renderToastHarness();
        fireEvent.click(screen.getByRole('button', { name: 'Show auto dismiss' }));

        expect(screen.getByText('Saved successfully')).toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(1200);
        });

        expect(screen.queryByText('Saved successfully')).not.toBeInTheDocument();

        vi.useRealTimers();
    });
});
