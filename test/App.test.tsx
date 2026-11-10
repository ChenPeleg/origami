import { screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { renderApp } from './providers/renderApp.tsx';

const savedProgress = () =>
    JSON.parse(localStorage.getItem('origami-progress') ?? 'null');

describe('App', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    describe('catalog', () => {
        it('renders the catalog with both guides at "/"', () => {
            renderApp('/');

            expect(
                screen.getByRole('heading', {
                    level: 1,
                    name: 'Pick something to fold',
                })
            ).toBeInTheDocument();
            expect(
                screen.getByRole('heading', { level: 2, name: 'Paper Cup' })
            ).toBeInTheDocument();
            expect(
                screen.getByRole('heading', { level: 2, name: 'Puppy Face' })
            ).toBeInTheDocument();
            expect(
                screen.getByRole('img', { name: /folded paper cup/i })
            ).toBeInTheDocument();
            expect(document.title).toBe('Pick something to fold – Origami');
        });

        it('shows the saved step on the card of a started guide', () => {
            localStorage.setItem(
                'origami-progress',
                JSON.stringify({
                    version: 1,
                    guides: { puppy: { currentStep: 3 } },
                })
            );

            renderApp('/');

            expect(
                screen.getByText(/continue from step 3/)
            ).toBeInTheDocument();
        });

        it('redirects an unknown route and an unknown guide to the catalog', () => {
            const first = renderApp('/nothing-here');
            expect(first.getLocation()).toBe('/');
            first.unmount();

            const second = renderApp('/guide/dragon/step/2');
            expect(second.getLocation()).toBe('/');
        });
    });

    describe('navbar on every screen', () => {
        it.each([
            '/',
            '/search',
            '/guide/cup',
            '/guide/cup/step/1',
            '/guide/cup/done',
        ])(
            'has logo, Catalog, Search and the language switch on %s',
            (route) => {
                renderApp(route);
                const banner = screen.getByRole('banner');

                expect(
                    within(banner).getByRole('link', { name: 'Origami' })
                ).toBeInTheDocument();
                expect(
                    within(banner).getByRole('link', { name: 'Catalog' })
                ).toBeInTheDocument();
                expect(
                    within(banner).getByRole('link', { name: 'Search' })
                ).toBeInTheDocument();
                expect(
                    within(banner).getByRole('button', {
                        name: 'Switch to Hebrew',
                    })
                ).toBeInTheDocument();
            }
        );
    });

    describe('language', () => {
        it('switches all text to Hebrew and back, without leaving the page', async () => {
            const { user, getLocation } = renderApp('/guide/cup/step/2');

            await user.click(
                screen.getByRole('button', { name: 'Switch to Hebrew' })
            );

            expect(
                screen.getByRole('heading', { level: 1, name: 'שלב 2 מתוך 5' })
            ).toBeInTheDocument();
            expect(
                screen.getByRole('link', { name: 'קטלוג' })
            ).toBeInTheDocument();
            expect(document.documentElement).toHaveAttribute('lang', 'he');
            expect(document.documentElement).toHaveAttribute('dir', 'rtl');
            expect(document.title).toBe('שלב 2 מתוך 5 – אוריגמי');
            expect(getLocation()).toBe('/guide/cup/step/2');
            expect(savedProgress().guides.cup.currentStep).toBe(2);

            await user.click(
                screen.getByRole('button', { name: 'מעבר לאנגלית' })
            );

            expect(
                screen.getByRole('heading', { level: 1, name: 'Step 2 of 5' })
            ).toBeInTheDocument();
            expect(document.documentElement).toHaveAttribute('dir', 'ltr');
        });

        it('saves the language and restores it on the next launch', async () => {
            const first = renderApp('/');
            await first.user.click(
                screen.getByRole('button', { name: 'Switch to Hebrew' })
            );
            first.unmount();

            renderApp('/');

            expect(
                screen.getByRole('heading', { level: 1, name: 'בחרו מה לקפל' })
            ).toBeInTheDocument();
        });

        it('does not move focus when the language changes', async () => {
            const { user } = renderApp('/');
            const toggle = screen.getByRole('button', {
                name: 'Switch to Hebrew',
            });

            await user.click(toggle);

            expect(
                screen.getByRole('button', { name: 'מעבר לאנגלית' })
            ).toHaveFocus();
        });
    });

    describe('guide overview', () => {
        it('shows the guide, what is needed and Start folding', () => {
            renderApp('/guide/cup');

            expect(
                screen.getByRole('heading', { level: 1, name: 'Paper Cup' })
            ).toBeInTheDocument();
            expect(screen.getByText('5 steps')).toBeInTheDocument();
            expect(screen.getByText('Easy')).toBeInTheDocument();
            expect(
                screen.getByText('Wax or baking paper, if it should hold water')
            ).toBeInTheDocument();
            expect(
                screen.getByRole('link', { name: 'Start folding' })
            ).toHaveAttribute('href', '/guide/cup/step/1');
            expect(
                screen.queryByRole('link', { name: 'Start over' })
            ).toBeNull();
        });

        it('offers Continue and Start over when there is saved progress', async () => {
            localStorage.setItem(
                'origami-progress',
                JSON.stringify({
                    version: 1,
                    guides: { cup: { currentStep: 3 } },
                })
            );
            const { user, getLocation } = renderApp('/guide/cup');

            expect(
                screen.getByRole('link', { name: 'Continue · Step 3' })
            ).toHaveAttribute('href', '/guide/cup/step/3');

            await user.click(screen.getByRole('link', { name: 'Start over' }));

            expect(getLocation()).toBe('/guide/cup/step/1');
            expect(savedProgress().guides.cup.currentStep).toBe(1);
        });
    });

    describe('folding steps', () => {
        it('shows the step with its diagram, progress and a disabled Back on step 1', () => {
            renderApp('/guide/cup/step/1');

            expect(
                screen.getByRole('heading', { level: 1, name: 'Step 1 of 5' })
            ).toBeInTheDocument();
            expect(screen.getByRole('progressbar')).toHaveAttribute(
                'aria-valuenow',
                '1'
            );
            expect(
                screen.getByRole('img', {
                    name: /^Fold diagram: Place the paper/,
                })
            ).toBeInTheDocument();
            expect(screen.getByText('corner to corner!')).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /Back/ })).toBeDisabled();
            expect(savedProgress().guides.cup.currentStep).toBe(1);
        });

        it('moves with Next and Back, saves the step, and focuses the new heading', async () => {
            const { user, getLocation } = renderApp('/guide/cup/step/1');

            await user.click(screen.getByRole('link', { name: /Next/ }));

            expect(getLocation()).toBe('/guide/cup/step/2');
            const heading = screen.getByRole('heading', {
                level: 1,
                name: 'Step 2 of 5',
            });
            expect(heading).toHaveFocus();
            expect(savedProgress().guides.cup.currentStep).toBe(2);
            expect(document.title).toBe('Step 2 of 5 – Origami');

            await user.click(screen.getByRole('link', { name: /Back/ }));

            expect(getLocation()).toBe('/guide/cup/step/1');
        });

        it('jumps to a step and marks the current one', async () => {
            const { user, getLocation } = renderApp('/guide/cup/step/2');
            const jumpNav = screen.getByRole('navigation', {
                name: 'Jump to a step',
            });

            expect(
                within(jumpNav).getByRole('link', { name: 'Step 2' })
            ).toHaveAttribute('aria-current', 'step');

            await user.click(
                within(jumpNav).getByRole('link', { name: 'Step 4' })
            );

            expect(getLocation()).toBe('/guide/cup/step/4');
            expect(
                within(jumpNav).getByRole('link', { name: 'Step 4' })
            ).toHaveAttribute('aria-current', 'step');
        });

        it('moves with the arrow keys, swapped in Hebrew', async () => {
            const { user, getLocation } = renderApp('/guide/cup/step/2');

            await user.keyboard('{ArrowRight}');
            expect(getLocation()).toBe('/guide/cup/step/3');
            await user.keyboard('{ArrowLeft}');
            expect(getLocation()).toBe('/guide/cup/step/2');

            await user.click(
                screen.getByRole('button', { name: 'Switch to Hebrew' })
            );
            await user.keyboard('{ArrowLeft}');
            expect(getLocation()).toBe('/guide/cup/step/3');
            await user.keyboard('{ArrowRight}');
            expect(getLocation()).toBe('/guide/cup/step/2');
        });

        it('clamps a step number that is out of range', () => {
            const high = renderApp('/guide/cup/step/99');
            expect(high.getLocation()).toBe('/guide/cup/step/5');
            high.unmount();

            const bad = renderApp('/guide/cup/step/abc');
            expect(bad.getLocation()).toBe('/guide/cup/step/1');
        });

        it('finishes on the last step, shows the completed screen and clears the progress', async () => {
            const { user, getLocation } = renderApp('/guide/puppy/step/4');

            expect(screen.queryByRole('link', { name: /Next/ })).toBeNull();
            await user.click(screen.getByRole('link', { name: /Finish/ }));

            expect(getLocation()).toBe('/guide/puppy/done');
            expect(
                screen.getByRole('heading', { level: 1, name: 'Well done!' })
            ).toBeInTheDocument();
            expect(
                screen.getByText('You folded the Puppy Face.')
            ).toBeInTheDocument();
            expect(savedProgress().guides.puppy).toBeUndefined();
            expect(
                screen.getByRole('link', { name: 'Choose another guide' })
            ).toHaveAttribute('href', '/');
            expect(
                screen.getByRole('link', { name: 'Fold it again' })
            ).toHaveAttribute('href', '/guide/puppy/step/1');
        });
    });

    describe('search', () => {
        it('shows a hint before typing', () => {
            renderApp('/search');

            expect(
                screen.getByText('Type a name to find a guide.')
            ).toBeInTheDocument();
            expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
        });

        it('filters while typing, keeps focus in the field, and shows the no-results message', async () => {
            const { user, getLocation } = renderApp('/search');
            const field = screen.getByRole('searchbox', {
                name: 'Search by name',
            });

            await user.type(field, 'pup');

            expect(
                screen.getByRole('heading', { level: 2, name: 'Puppy Face' })
            ).toBeInTheDocument();
            expect(
                screen.queryByRole('heading', { level: 2, name: 'Paper Cup' })
            ).toBeNull();
            expect(field).toHaveFocus();
            expect(getLocation()).toBe('/search?q=pup');

            await user.type(field, 'zzz');

            expect(
                screen.getByText('No guides found. Try another word.')
            ).toBeInTheDocument();

            await user.clear(field);

            expect(
                screen.getByText('Type a name to find a guide.')
            ).toBeInTheDocument();
            expect(getLocation()).toBe('/search');
        });

        it('restores the query from the URL', () => {
            renderApp('/search?q=cup');

            expect(screen.getByRole('searchbox')).toHaveValue('cup');
            expect(
                screen.getByRole('heading', { level: 2, name: 'Paper Cup' })
            ).toBeInTheDocument();
        });
    });
});
