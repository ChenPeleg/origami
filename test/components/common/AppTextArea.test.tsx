import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { describe, it, expect, vi } from 'vitest';

import { AppTextArea } from '../../../src/common/AppTextArea/AppTextArea';

describe('AppTextArea', () => {
    it('renders a textarea element', () => {
        render(<AppTextArea />);
        expect(screen.getByRole('textbox')).toBeTruthy();
    });

    it('renders with the provided value', () => {
        render(<AppTextArea value="initial content" onChange={vi.fn()} />);
        expect((screen.getByRole('textbox') as HTMLTextAreaElement).value).toBe(
            'initial content',
        );
    });

    it('applies the default className when none is provided', () => {
        render(<AppTextArea />);
        expect(screen.getByRole('textbox').className).toContain('rounded-lg');
    });

    it('applies a custom className instead of the default', () => {
        render(<AppTextArea className="my-textarea" />);
        const textarea = screen.getByRole('textbox');
        expect(textarea.className).toContain('my-textarea');
        expect(textarea.className).not.toContain('rounded-lg');
    });

    it('calls onChange when the value changes', () => {
        const onChange = vi.fn();
        render(<AppTextArea onChange={onChange} />);
        fireEvent.change(screen.getByRole('textbox'), {
            target: { value: 'new content' },
        });
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('forwards textAreaRef to the underlying textarea element', () => {
        const ref = createRef<HTMLTextAreaElement>();
        render(<AppTextArea textAreaRef={ref} />);
        expect(ref.current).not.toBeNull();
        expect(ref.current?.tagName.toLowerCase()).toBe('textarea');
    });

    it('passes through arbitrary HTML textarea props', () => {
        render(<AppTextArea placeholder="Type here" rows={5} disabled />);
        const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
        expect(textarea.placeholder).toBe('Type here');
        expect(textarea.rows).toBe(5);
        expect(textarea.disabled).toBe(true);
    });
});
