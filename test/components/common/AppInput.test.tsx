import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { describe, it, expect, vi } from 'vitest';

import { AppInput } from '../../../src/common/AppInput/AppInput';

describe('AppInput', () => {
    it('renders an input element', () => {
        render(<AppInput />);
        expect(screen.getByRole('textbox')).toBeTruthy();
    });

    it('renders with the provided value', () => {
        render(<AppInput value="hello" onChange={vi.fn()} />);
        expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('hello');
    });

    it('applies the default className when none is provided', () => {
        render(<AppInput />);
        expect(screen.getByRole('textbox').className).toContain('rounded-lg');
    });

    it('applies a custom className instead of the default', () => {
        render(<AppInput className="my-input" />);
        const input = screen.getByRole('textbox');
        expect(input.className).toContain('my-input');
        expect(input.className).not.toContain('rounded-lg');
    });

    it('calls onChange when the input value changes', () => {
        const onChange = vi.fn();
        render(<AppInput onChange={onChange} />);
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('forwards inputRef to the underlying input element', () => {
        const ref = createRef<HTMLInputElement>();
        render(<AppInput inputRef={ref} />);
        expect(ref.current).not.toBeNull();
        expect(ref.current?.tagName.toLowerCase()).toBe('input');
    });

    it('passes through arbitrary HTML input props', () => {
        render(<AppInput placeholder="Enter text" disabled />);
        const input = screen.getByRole('textbox') as HTMLInputElement;
        expect(input.placeholder).toBe('Enter text');
        expect(input.disabled).toBe(true);
    });
});
