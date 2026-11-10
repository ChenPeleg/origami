import { render, screen } from '@testing-library/react';
import { AppHandNote } from './AppHandNote';

describe('AppHandNote', () => {
    it('renders a paragraph in the handwriting font by default', () => {
        render(<AppHandNote>corner to corner!</AppHandNote>);

        const note = screen.getByText('corner to corner!');
        expect(note.tagName).toBe('P');
        expect(note).toHaveClass('font-hand', 'text-teal', 'text-[30px]');
    });

    it('renders as another element in the smaller size', () => {
        render(
            <AppHandNote as="span" size="md" className="custom-note">
                continue from step 2
            </AppHandNote>
        );

        const note = screen.getByText('continue from step 2');
        expect(note.tagName).toBe('SPAN');
        expect(note).toHaveClass('text-[26px]', 'custom-note');
    });
});
