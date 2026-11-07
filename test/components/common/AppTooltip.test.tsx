import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { AppTooltip } from '../../../src/common/AppTooltip/AppTooltip';

describe('AppTooltip', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders children', () => {
        const { container } = render(
            <AppTooltip content="Tooltip text">Hover me</AppTooltip>,
        );
        expect(container.textContent).toContain('Hover me');
    });

    it('renders tooltip content in the DOM', () => {
        render(<AppTooltip content="Tooltip text">Hover me</AppTooltip>);
        expect(screen.getByRole('tooltip')).toBeTruthy();
        expect(screen.getByText('Tooltip text')).toBeTruthy();
    });

    it('is hidden by default (opacity-0)', () => {
        render(<AppTooltip content="Tooltip text">Hover me</AppTooltip>);
        expect(screen.getByRole('tooltip').className).toContain('opacity-0');
    });

    it('shows tooltip after mouseenter and delay', () => {
        const { container } = render(
            <AppTooltip content="Tooltip text" delay={300}>
                Hover me
            </AppTooltip>,
        );
        const wrapper = container.firstChild as HTMLElement;
        fireEvent.mouseEnter(wrapper);
        act(() => {
            vi.advanceTimersByTime(300);
        });
        expect(screen.getByRole('tooltip').className).toContain('opacity-100');
    });

    it('does not show tooltip before delay elapses', () => {
        const { container } = render(
            <AppTooltip content="Tooltip text" delay={500}>
                Hover me
            </AppTooltip>,
        );
        const wrapper = container.firstChild as HTMLElement;
        fireEvent.mouseEnter(wrapper);
        act(() => {
            vi.advanceTimersByTime(200);
        });
        expect(screen.getByRole('tooltip').className).toContain('opacity-0');
    });

    it('hides tooltip on mouseleave', () => {
        const { container } = render(
            <AppTooltip content="Tooltip text" delay={0}>
                Hover me
            </AppTooltip>,
        );
        const wrapper = container.firstChild as HTMLElement;
        fireEvent.mouseEnter(wrapper);
        act(() => {
            vi.runAllTimers();
        });
        fireEvent.mouseLeave(wrapper);
        expect(screen.getByRole('tooltip').className).toContain('opacity-0');
    });

    it('shows tooltip on focus and hides on blur', () => {
        const { container } = render(
            <AppTooltip content="tip" delay={0}>
                child
            </AppTooltip>,
        );
        const wrapper = container.firstChild as HTMLElement;
        fireEvent.focus(wrapper);
        act(() => {
            vi.runAllTimers();
        });
        expect(screen.getByRole('tooltip').className).toContain('opacity-100');
        fireEvent.blur(wrapper);
        expect(screen.getByRole('tooltip').className).toContain('opacity-0');
    });

    it('applies default top position class', () => {
        render(<AppTooltip content="tip">child</AppTooltip>);
        expect(screen.getByRole('tooltip').className).toContain('bottom-full');
    });

    it('applies bottom position class when position="bottom"', () => {
        render(
            <AppTooltip content="tip" position="bottom">
                child
            </AppTooltip>,
        );
        expect(screen.getByRole('tooltip').className).toContain('top-full');
    });

    it('applies left position class when position="left"', () => {
        render(
            <AppTooltip content="tip" position="left">
                child
            </AppTooltip>,
        );
        expect(screen.getByRole('tooltip').className).toContain('right-full');
    });

    it('applies right position class when position="right"', () => {
        render(
            <AppTooltip content="tip" position="right">
                child
            </AppTooltip>,
        );
        expect(screen.getByRole('tooltip').className).toContain('left-full');
    });

    it('adds aria-describedby on the wrapper when tooltip is visible', () => {
        const { container } = render(
            <AppTooltip content="tip" delay={0}>
                child
            </AppTooltip>,
        );
        const wrapper = container.firstChild as HTMLElement;
        fireEvent.mouseEnter(wrapper);
        act(() => {
            vi.runAllTimers();
        });
        expect(wrapper.getAttribute('aria-describedby')).toBeTruthy();
    });

    it('removes aria-describedby when tooltip is hidden', () => {
        const { container } = render(
            <AppTooltip content="tip" delay={0}>
                child
            </AppTooltip>,
        );
        const wrapper = container.firstChild as HTMLElement;
        fireEvent.mouseEnter(wrapper);
        act(() => {
            vi.runAllTimers();
        });
        fireEvent.mouseLeave(wrapper);
        expect(wrapper.getAttribute('aria-describedby')).toBeNull();
    });

    it('applies custom className to tooltip element', () => {
        render(
            <AppTooltip content="tip" className="custom-tooltip">
                child
            </AppTooltip>,
        );
        expect(screen.getByRole('tooltip').className).toContain('custom-tooltip');
    });
});
