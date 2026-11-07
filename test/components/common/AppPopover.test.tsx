import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { AppPopover } from '../../../src/common/AppPopover/AppPopover';

describe('AppPopover', () => {
    it('renders the trigger element', () => {
        render(
            <AppPopover trigger={<button>Open popover</button>}>
                <p>Popover content</p>
            </AppPopover>,
        );
        expect(screen.getByText('Open popover')).toBeTruthy();
    });

    it('does not show panel content before trigger is clicked', () => {
        render(
            <AppPopover trigger={<button>Open popover</button>}>
                <p>Popover content</p>
            </AppPopover>,
        );
        expect(screen.queryByText('Popover content')).toBeNull();
    });

    it('shows panel content after clicking the trigger', () => {
        render(
            <AppPopover trigger={<button>Open popover</button>}>
                <p>Popover content</p>
            </AppPopover>,
        );
        fireEvent.click(screen.getByText('Open popover'));
        expect(screen.getByText('Popover content')).toBeTruthy();
    });

    it('hides panel content when trigger is clicked again', async () => {
        render(
            <AppPopover trigger={<button>Open popover</button>}>
                <p>Popover content</p>
            </AppPopover>,
        );
        fireEvent.click(screen.getByText('Open popover'));
        expect(screen.getByText('Popover content')).toBeTruthy();
        fireEvent.click(screen.getByText('Open popover'));
        await waitFor(() => {
            expect(screen.queryByText('Popover content')).toBeNull();
        });
    });

    it('renders ReactNode trigger', () => {
        render(
            <AppPopover trigger={<span data-testid="custom-trigger">Trigger</span>}>
                content
            </AppPopover>,
        );
        expect(screen.getByTestId('custom-trigger')).toBeTruthy();
    });

    it('renders ReactNode children inside the panel', () => {
        render(
            <AppPopover trigger={<button>Open</button>}>
                <ul>
                    <li>Item A</li>
                    <li>Item B</li>
                </ul>
            </AppPopover>,
        );
        fireEvent.click(screen.getByText('Open'));
        expect(screen.getByText('Item A')).toBeTruthy();
        expect(screen.getByText('Item B')).toBeTruthy();
    });
});
