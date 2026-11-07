import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { AppDropdown } from '../../../src/common/AppDropdown/AppDropdown';

describe('AppDropdown', () => {
    it('renders the trigger element', () => {
        render(
            <AppDropdown
                trigger={<button>Open menu</button>}
                items={[{ label: 'Edit', onClick: vi.fn() }]}
            />,
        );
        expect(screen.getByText('Open menu')).toBeTruthy();
    });

    it('does not show menu items before trigger is clicked', () => {
        render(
            <AppDropdown
                trigger={<button>Open menu</button>}
                items={[{ label: 'Edit', onClick: vi.fn() }]}
            />,
        );
        expect(screen.queryByText('Edit')).toBeNull();
    });

    it('shows menu items after clicking the trigger', () => {
        render(
            <AppDropdown
                trigger={<button>Open menu</button>}
                items={[
                    { label: 'Edit', onClick: vi.fn() },
                    { label: 'Delete', onClick: vi.fn() },
                ]}
            />,
        );
        fireEvent.click(screen.getByText('Open menu'));
        expect(screen.getByText('Edit')).toBeTruthy();
        expect(screen.getByText('Delete')).toBeTruthy();
    });

    it('calls the item onClick handler when a menu item is clicked', () => {
        const onClick = vi.fn();
        render(
            <AppDropdown
                trigger={<button>Open menu</button>}
                items={[{ label: 'Edit', onClick }]}
            />,
        );
        fireEvent.click(screen.getByText('Open menu'));
        fireEvent.click(screen.getByText('Edit'));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('renders item icon when provided', () => {
        render(
            <AppDropdown
                trigger={<button>Open menu</button>}
                items={[
                    {
                        label: 'Edit',
                        onClick: vi.fn(),
                        icon: <span data-testid="edit-icon" />,
                    },
                ]}
            />,
        );
        fireEvent.click(screen.getByText('Open menu'));
        expect(screen.getByTestId('edit-icon')).toBeTruthy();
    });

    it('disables menu item when disabled=true', () => {
        render(
            <AppDropdown
                trigger={<button>Open menu</button>}
                items={[{ label: 'Delete', onClick: vi.fn(), disabled: true }]}
            />,
        );
        fireEvent.click(screen.getByText('Open menu'));
        const button = screen.getByText('Delete').closest('button');
        expect(button?.disabled).toBe(true);
    });

    it('renders a separator when divider=true', () => {
        const { container } = render(
            <AppDropdown
                trigger={<button>Open menu</button>}
                items={[
                    { label: 'Edit', onClick: vi.fn(), divider: true },
                    { label: 'Delete', onClick: vi.fn() },
                ]}
            />,
        );
        fireEvent.click(screen.getByText('Open menu'));
        expect(container.querySelector('[role="separator"]')).toBeTruthy();
    });

    it('applies custom className to the menu container', () => {
        const { container } = render(
            <AppDropdown
                trigger={<button>Open menu</button>}
                items={[{ label: 'Edit', onClick: vi.fn() }]}
                className="custom-menu"
            />,
        );
        expect(container.querySelector('.custom-menu')).toBeTruthy();
    });
});
