import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { AppToast } from '../../../src/common/AppToast/AppToast';
import { AppToastContainer } from '../../../src/common/AppToast/AppToastContainer';
import { ToastProvider } from '../../../src/common/AppToast/ToastContext';
import { useToast } from '../../../src/common/AppToast/useToast';

/** Helper component that exercises the useToast hook. */
function ToastTriggers() {
    const { showSuccess, showError, showWarning, showInfo } = useToast();
    return (
        <div>
            <button onClick={() => showSuccess('Success message')}>Success</button>
            <button onClick={() => showError('Error message')}>Error</button>
            <button onClick={() => showWarning('Warning message')}>Warning</button>
            <button onClick={() => showInfo('Info message')}>Info</button>
        </div>
    );
}

function TestApp() {
    return (
        <ToastProvider>
            <ToastTriggers />
            <AppToastContainer />
        </ToastProvider>
    );
}

describe('AppToast', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders the toast message', () => {
        render(
            <AppToast
                id="t1"
                type="success"
                message="Hello world"
                onDismiss={vi.fn()}
            />,
        );
        expect(screen.getByText('Hello world')).toBeTruthy();
    });

    it('renders with role="alert"', () => {
        render(
            <AppToast
                id="t1"
                type="info"
                message="Info toast"
                onDismiss={vi.fn()}
            />,
        );
        expect(screen.getByRole('alert')).toBeTruthy();
    });

    it('renders the dismiss button', () => {
        render(
            <AppToast
                id="t1"
                type="success"
                message="Hello"
                onDismiss={vi.fn()}
            />,
        );
        expect(screen.getByLabelText('Dismiss notification')).toBeTruthy();
    });

    it('renders for all toast types', () => {
        const types = ['success', 'error', 'warning', 'info'] as const;
        types.forEach((type) => {
            const { unmount } = render(
                <AppToast
                    id={`t-${type}`}
                    type={type}
                    message={`${type} message`}
                    onDismiss={vi.fn()}
                />,
            );
            expect(screen.getByText(`${type} message`)).toBeTruthy();
            unmount();
        });
    });

    it('does not render a progress bar when duration=0', () => {
        const { container } = render(
            <AppToast
                id="t1"
                type="success"
                message="No bar"
                duration={0}
                onDismiss={vi.fn()}
            />,
        );
        // Progress bar has inline animation style only when duration > 0
        const bars = container.querySelectorAll('[style*="animation"]');
        expect(bars.length).toBe(0);
    });

    it('renders a progress bar when duration > 0', () => {
        const { container } = render(
            <AppToast
                id="t1"
                type="success"
                message="With bar"
                duration={3000}
                onDismiss={vi.fn()}
            />,
        );
        const bar = container.querySelector('[style*="animation"]');
        expect(bar).toBeTruthy();
    });
});

describe('ToastProvider and useToast', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders success toast via showSuccess', () => {
        render(<TestApp />);
        fireEvent.click(screen.getByText('Success'));
        expect(screen.getByText('Success message')).toBeTruthy();
    });

    it('renders error toast via showError', () => {
        render(<TestApp />);
        fireEvent.click(screen.getByText('Error'));
        expect(screen.getByText('Error message')).toBeTruthy();
    });

    it('renders warning toast via showWarning', () => {
        render(<TestApp />);
        fireEvent.click(screen.getByText('Warning'));
        expect(screen.getByText('Warning message')).toBeTruthy();
    });

    it('renders info toast via showInfo', () => {
        render(<TestApp />);
        fireEvent.click(screen.getByText('Info'));
        expect(screen.getByText('Info message')).toBeTruthy();
    });

    it('removes toast from the container after its duration expires', () => {
        render(<TestApp />);
        fireEvent.click(screen.getByText('Success'));
        expect(screen.getByText('Success message')).toBeTruthy();
        act(() => {
            vi.advanceTimersByTime(5000);
        });
        expect(screen.queryByText('Success message')).toBeNull();
    });

    it('renders multiple toasts simultaneously', () => {
        render(<TestApp />);
        fireEvent.click(screen.getByText('Success'));
        fireEvent.click(screen.getByText('Error'));
        expect(screen.getByText('Success message')).toBeTruthy();
        expect(screen.getByText('Error message')).toBeTruthy();
    });

    it('throws when useToast is used outside a ToastProvider', () => {
        const ConsumerWithoutProvider = () => {
            useToast();
            return null;
        };
        // Suppress expected error output in the test console
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
        expect(() => render(<ConsumerWithoutProvider />)).toThrow();
        consoleError.mockRestore();
    });
});
