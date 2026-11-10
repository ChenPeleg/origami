import { render, screen } from '@testing-library/react';
import { AppPaperScrap } from './AppPaperScrap';

describe('AppPaperScrap', () => {
    it('renders its children in a div by default', () => {
        render(<AppPaperScrap>Fold me</AppPaperScrap>);

        const scrap = screen.getByText('Fold me');
        expect(scrap.tagName).toBe('DIV');
        expect(scrap).toHaveClass('bg-scrap');
    });

    it('renders as another element and forwards its props', () => {
        render(
            <AppPaperScrap as="a" href="/guide/cup">
                Paper Cup
            </AppPaperScrap>
        );

        expect(screen.getByRole('link', { name: 'Paper Cup' })).toHaveAttribute(
            'href',
            '/guide/cup'
        );
    });

    it('renders one washi tape per entry', () => {
        const { container } = render(
            <AppPaperScrap
                tapes={[
                    { pattern: 'dots', position: 'left' },
                    { pattern: 'bands', position: 'right' },
                ]}
            >
                Content
            </AppPaperScrap>
        );

        const tapes = container.querySelectorAll('[data-pattern]');
        expect(tapes).toHaveLength(2);
        expect(tapes[0]).toHaveAttribute('data-pattern', 'dots');
        expect(tapes[1]).toHaveAttribute('data-pattern', 'bands');
    });

    it('renders no tape by default and merges a custom className', () => {
        const { container } = render(
            <AppPaperScrap className="custom-scrap">Content</AppPaperScrap>
        );

        expect(container.querySelectorAll('[data-pattern]')).toHaveLength(0);
        expect(screen.getByText('Content')).toHaveClass(
            'custom-scrap',
            'bg-scrap'
        );
    });
});
