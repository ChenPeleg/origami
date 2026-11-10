import { screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import Navbar from '../../../src/components/layout/Navbar.tsx';
import { SkipLink } from '../../../src/components/layout/SkipLink.tsx';
import { renderApp, renderWithApp } from '../../providers/renderApp.tsx';

describe('Navbar', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('marks the current page', () => {
        renderWithApp(<Navbar />, '/search');

        expect(screen.getByRole('link', { name: 'Search' })).toHaveAttribute(
            'aria-current',
            'page'
        );
        expect(
            screen.getByRole('link', { name: 'Catalog' })
        ).not.toHaveAttribute('aria-current');
    });

    it('marks no link on a guide page', () => {
        renderWithApp(<Navbar />, '/guide/cup');

        expect(
            screen.getByRole('link', { name: 'Catalog' })
        ).not.toHaveAttribute('aria-current');
    });

    it('has a menu button that is closed by default and toggles the links', async () => {
        const { user } = renderWithApp(<Navbar />);
        const menuButton = screen.getByRole('button', { name: 'Menu' });
        const links = screen.getByRole('list');

        expect(menuButton).toHaveAttribute('aria-expanded', 'false');
        expect(menuButton).toHaveAttribute('aria-controls', links.id);
        expect(links).toHaveClass('hidden');

        await user.click(menuButton);

        expect(menuButton).toHaveAttribute('aria-expanded', 'true');
        expect(links).not.toHaveClass('hidden');

        await user.click(menuButton);

        expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('closes the menu with Escape', async () => {
        const { user } = renderWithApp(<Navbar />);
        const menuButton = screen.getByRole('button', { name: 'Menu' });

        await user.click(menuButton);
        await user.keyboard('{Escape}');

        expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('closes the menu after navigating', async () => {
        const { user, getLocation } = renderApp('/');
        const banner = screen.getByRole('banner');
        const menuButton = within(banner).getByRole('button', { name: 'Menu' });

        await user.click(menuButton);
        await user.click(within(banner).getByRole('link', { name: 'Search' }));

        expect(getLocation()).toBe('/search');
        expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('goes home from the logo', async () => {
        const { user, getLocation } = renderApp('/guide/cup');

        await user.click(screen.getByRole('link', { name: 'Origami' }));

        expect(getLocation()).toBe('/');
    });

    it('shows the other language on the switch, marked with its own lang', () => {
        renderWithApp(<Navbar />);
        const toggle = screen.getByRole('button', { name: 'Switch to Hebrew' });

        expect(toggle).toHaveTextContent('עברית');
        expect(toggle).toHaveAttribute('lang', 'he');
    });
});

describe('SkipLink', () => {
    it('moves focus to the main content without changing the route', async () => {
        const { user, getLocation } = renderWithApp(
            <>
                <SkipLink targetId="main" />
                <main id="main" tabIndex={-1} />
            </>,
            '/search'
        );

        await user.click(screen.getByRole('link', { name: 'Skip to content' }));

        expect(screen.getByRole('main')).toHaveFocus();
        expect(getLocation()).toBe('/search');
    });
});
