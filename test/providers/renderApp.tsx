import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { MemoryRouter, useLocation } from 'react-router';

import { ServicesProvider } from '../../src/services/provider/ServicesProvider.tsx';
import { injectedServices } from '../../src/services/injection/injectedServices.ts';
import { GlobalStateContextProvider } from '../../src/stores/GlobalState.tsx';
import { AppRoutes } from '../../src/AppRoutes.tsx';

const LocationProbe = () => {
    const location = useLocation();
    return (
        <output data-testid="location">
            {location.pathname + location.search}
        </output>
    );
};

/**
 * Render something inside the app's providers (router, services, global state)
 */
export function renderWithApp(ui: ReactNode, route: string = '/') {
    const user = userEvent.setup();
    const view = render(
        <MemoryRouter initialEntries={[route]}>
            <ServicesProvider services={injectedServices}>
                <GlobalStateContextProvider>
                    {ui}
                    <LocationProbe />
                </GlobalStateContextProvider>
            </ServicesProvider>
        </MemoryRouter>
    );
    const getLocation = () => view.getByTestId('location').textContent;
    return { ...view, user, getLocation };
}

/**
 * Render the whole app at a route
 */
export function renderApp(route: string = '/') {
    return renderWithApp(<AppRoutes />, route);
}
