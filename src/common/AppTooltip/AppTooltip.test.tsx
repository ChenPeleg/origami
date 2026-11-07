import { act, fireEvent, render, screen } from '@testing-library/react';
import { AppTooltip } from './AppTooltip';

describe('AppTooltip', () => {
    it('is hidden initially and toggles visibility on hover', () => {
        vi.useFakeTimers();

        render(
            <AppTooltip content="Helpful hint" delay={200}>
                <button type="button">Hover me</button>
            </AppTooltip>
        );

        const tooltip = screen.getByRole('tooltip');
        const trigger = screen.getByRole('button', { name: 'Hover me' });

        expect(tooltip).toHaveClass('opacity-0');

        fireEvent.mouseEnter(trigger);
        act(() => {
            vi.advanceTimersByTime(200);
        });

        expect(tooltip).toHaveClass('opacity-100');

        fireEvent.mouseLeave(trigger);

        expect(tooltip).toHaveClass('opacity-0');

        vi.useRealTimers();
    });
});
