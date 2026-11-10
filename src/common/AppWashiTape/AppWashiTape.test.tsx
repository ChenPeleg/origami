import { render } from '@testing-library/react';
import { AppWashiTape } from './AppWashiTape';

describe('AppWashiTape', () => {
    it('is hidden from assistive technology', () => {
        const { container } = render(<AppWashiTape pattern="dots" />);

        expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
    });

    it.each([
        ['stripes', 'tape-stripes'],
        ['dots', 'tape-dots'],
        ['bands', 'tape-bands'],
    ] as const)('applies the %s pattern', (pattern, expectedClass) => {
        const { container } = render(<AppWashiTape pattern={pattern} />);

        expect(container.firstChild).toHaveClass(expectedClass);
    });

    it('sits in the center by default and on a side when asked', () => {
        const { container, rerender } = render(<AppWashiTape pattern="dots" />);
        expect(container.firstChild).toHaveClass('-rotate-2');

        rerender(<AppWashiTape pattern="dots" position="left" />);
        expect(container.firstChild).toHaveClass('left-[18px]');

        rerender(<AppWashiTape pattern="dots" position="right" />);
        expect(container.firstChild).toHaveClass('right-[18px]');
    });
});
