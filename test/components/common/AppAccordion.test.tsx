import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { AppAccordion } from '../../../src/common/AppAccordion/AppAccordion';

const items = [
    { id: 'item-1', title: 'Section One', content: 'Content One' },
    { id: 'item-2', title: 'Section Two', content: 'Content Two' },
    { id: 'item-3', title: 'Section Three', content: 'Content Three' },
];

describe('AppAccordion', () => {
    it('renders all item titles', () => {
        render(<AppAccordion items={items} />);
        items.forEach((item) => {
            expect(screen.getByText(item.title)).toBeTruthy();
        });
    });

    it('does not show item content by default', () => {
        render(<AppAccordion items={items} />);
        expect(screen.queryByText('Content One')).toBeNull();
        expect(screen.queryByText('Content Two')).toBeNull();
    });

    it('shows content when an item header is clicked', () => {
        render(<AppAccordion items={items} />);
        fireEvent.click(screen.getByText('Section One'));
        expect(screen.getByText('Content One')).toBeTruthy();
    });

    it('hides content when the same header is clicked again', () => {
        render(<AppAccordion items={items} />);
        fireEvent.click(screen.getByText('Section One'));
        expect(screen.getByText('Content One')).toBeTruthy();
        fireEvent.click(screen.getByText('Section One'));
        expect(screen.queryByText('Content One')).toBeNull();
    });

    it('closes a previously open item when another is opened (allowMultiple=false)', () => {
        render(<AppAccordion items={items} />);
        fireEvent.click(screen.getByText('Section One'));
        expect(screen.getByText('Content One')).toBeTruthy();

        fireEvent.click(screen.getByText('Section Two'));
        expect(screen.queryByText('Content One')).toBeNull();
        expect(screen.getByText('Content Two')).toBeTruthy();
    });

    it('allows multiple items open simultaneously when allowMultiple=true', () => {
        render(<AppAccordion items={items} allowMultiple />);
        fireEvent.click(screen.getByText('Section One'));
        fireEvent.click(screen.getByText('Section Two'));
        expect(screen.getByText('Content One')).toBeTruthy();
        expect(screen.getByText('Content Two')).toBeTruthy();
    });

    it('opens items specified in defaultOpen on initial render', () => {
        render(<AppAccordion items={items} defaultOpen={['item-2']} />);
        expect(screen.getByText('Content Two')).toBeTruthy();
        expect(screen.queryByText('Content One')).toBeNull();
    });

    it('sets aria-expanded="true" on an open item button', () => {
        render(<AppAccordion items={items} />);
        const button = screen.getByText('Section One').closest('button')!;
        expect(button.getAttribute('aria-expanded')).toBe('false');
        fireEvent.click(button);
        expect(button.getAttribute('aria-expanded')).toBe('true');
    });

    it('sets aria-controls to link button to its panel', () => {
        render(<AppAccordion items={items} />);
        const button = screen.getByText('Section One').closest('button')!;
        const panelId = button.getAttribute('aria-controls');
        expect(panelId).toBeTruthy();
        fireEvent.click(button);
        const panel = document.getElementById(panelId!);
        expect(panel).toBeTruthy();
    });

    it('renders item icon when provided', () => {
        const itemsWithIcon = [
            {
                id: 'icon-item',
                title: 'With Icon',
                content: 'Content',
                icon: <span data-testid="accordion-icon" />,
            },
        ];
        render(<AppAccordion items={itemsWithIcon} />);
        expect(screen.getByTestId('accordion-icon')).toBeTruthy();
    });

    it('renders ReactNode content inside the panel', () => {
        const itemsWithNodeContent = [
            {
                id: 'node-item',
                title: 'Node Content',
                content: <span data-testid="node-content">Rich content</span>,
            },
        ];
        render(<AppAccordion items={itemsWithNodeContent} />);
        fireEvent.click(screen.getByText('Node Content'));
        expect(screen.getByTestId('node-content')).toBeTruthy();
    });
});
