import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { AppModal } from '../../../src/common/AppModal/AppModal';

describe('AppModal', () => {
    it('does not render content when isOpen is false', () => {
        render(
            <AppModal isOpen={false} onClose={vi.fn()}>
                <p>Modal content</p>
            </AppModal>,
        );
        expect(screen.queryByText('Modal content')).toBeNull();
    });

    it('renders content when isOpen is true', () => {
        render(
            <AppModal isOpen={true} onClose={vi.fn()}>
                <p>Modal content</p>
            </AppModal>,
        );
        expect(screen.getByText('Modal content')).toBeTruthy();
    });

    it('renders the title when provided', () => {
        render(
            <AppModal isOpen={true} onClose={vi.fn()} title="My Modal Title">
                <p>content</p>
            </AppModal>,
        );
        expect(screen.getByText('My Modal Title')).toBeTruthy();
    });

    it('does not render a title element when title is not provided', () => {
        render(
            <AppModal isOpen={true} onClose={vi.fn()}>
                <p>content</p>
            </AppModal>,
        );
        expect(screen.queryByRole('heading')).toBeNull();
    });

    it('renders the close button by default', () => {
        render(
            <AppModal isOpen={true} onClose={vi.fn()} title="Modal">
                <p>content</p>
            </AppModal>,
        );
        expect(screen.getByLabelText('Close dialog')).toBeTruthy();
    });

    it('hides the close button when showCloseButton=false', () => {
        render(
            <AppModal isOpen={true} onClose={vi.fn()} showCloseButton={false}>
                <p>content</p>
            </AppModal>,
        );
        expect(screen.queryByLabelText('Close dialog')).toBeNull();
    });

    it('calls onClose when the close button is clicked', () => {
        const onClose = vi.fn();
        render(
            <AppModal isOpen={true} onClose={onClose} title="Modal">
                <p>content</p>
            </AppModal>,
        );
        fireEvent.click(screen.getByLabelText('Close dialog'));
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('renders ReactNode children inside the dialog panel', () => {
        render(
            <AppModal isOpen={true} onClose={vi.fn()}>
                <form data-testid="inner-form">
                    <input type="text" />
                </form>
            </AppModal>,
        );
        expect(screen.getByTestId('inner-form')).toBeTruthy();
    });

    it('applies the md size class by default', () => {
        render(
            <AppModal isOpen={true} onClose={vi.fn()}>
                <p>content</p>
            </AppModal>,
        );
        // HeadlessUI Dialog renders into a portal on document.body
        expect(document.body.querySelector('.max-w-md')).toBeTruthy();
    });

    it('applies the correct size class for size="lg"', () => {
        render(
            <AppModal isOpen={true} onClose={vi.fn()} size="lg">
                <p>content</p>
            </AppModal>,
        );
        expect(document.body.querySelector('.max-w-lg')).toBeTruthy();
    });

    it('applies custom className to the dialog panel', () => {
        render(
            <AppModal isOpen={true} onClose={vi.fn()} className="custom-modal">
                <p>content</p>
            </AppModal>,
        );
        expect(document.body.querySelector('.custom-modal')).toBeTruthy();
    });
});
