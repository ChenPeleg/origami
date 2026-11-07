import { render, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { describe, it, expect, vi } from 'vitest';

import { AppDateInput } from '../../../src/common/AppDateInput/AppDateInput';

describe('AppDateInput', () => {
    it('renders an input element with type="date"', () => {
        const { container } = render(<AppDateInput />);
        const input = container.querySelector('input[type="date"]');
        expect(input).toBeTruthy();
    });

    it('renders with the provided value', () => {
        const { container } = render(
            <AppDateInput value="2024-03-15" onChange={vi.fn()} />,
        );
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input.value).toBe('2024-03-15');
    });

    it('applies the default className when none is provided', () => {
        const { container } = render(<AppDateInput />);
        expect((container.querySelector('input') as HTMLInputElement).className).toContain(
            'rounded-lg',
        );
    });

    it('applies a custom className instead of the default', () => {
        const { container } = render(<AppDateInput className="date-picker" />);
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input.className).toContain('date-picker');
        expect(input.className).not.toContain('rounded-lg');
    });

    it('calls onChange when the value changes', () => {
        const onChange = vi.fn();
        const { container } = render(<AppDateInput onChange={onChange} />);
        const input = container.querySelector('input') as HTMLInputElement;
        fireEvent.change(input, { target: { value: '2024-06-01' } });
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('forwards inputRef to the underlying input element', () => {
        const ref = createRef<HTMLInputElement>();
        render(<AppDateInput inputRef={ref} />);
        expect(ref.current).not.toBeNull();
        expect(ref.current?.type).toBe('date');
    });

    it('passes through arbitrary HTML input props', () => {
        const { container } = render(<AppDateInput disabled min="2024-01-01" max="2024-12-31" />);
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input.disabled).toBe(true);
        expect(input.min).toBe('2024-01-01');
        expect(input.max).toBe('2024-12-31');
    });
});
