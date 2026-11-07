import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { ServicesProvider } from '../src/services/provider/ServicesProvider.tsx';
import { injectedServices } from '../src/services/injection/injectedServices.ts';
import { UserProvider } from '../src/stores/UserContext.tsx';
import { GlobalStateContextProvider } from '../src/stores/GlobalState.tsx';
import { AppRoutes } from '../src/AppRoutes.tsx';

function renderApp(route: string = '/') {
    return render(
        <MemoryRouter initialEntries={[route]}>
            <ServicesProvider services={injectedServices}>
                <GlobalStateContextProvider>
                    <UserProvider>
                        <AppRoutes />
                    </UserProvider>
                </GlobalStateContextProvider>
            </ServicesProvider>
        </MemoryRouter>
    );
}

describe('App', () => {
    it('renders the home page at "/"', () => {
        renderApp('/');
        expect(screen.getByText('טפסי אישור פעילות')).toBeTruthy();
    });
});
