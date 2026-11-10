import { HashRouter } from 'react-router';

import { ServicesProvider } from './services/provider/ServicesProvider.tsx';
import { injectedServices } from './services/injection/injectedServices.ts';
import { GlobalStateContextProvider } from './stores/GlobalState.tsx';
import { AppRoutes } from './AppRoutes.tsx';

/**
 * Hash routing needs no server rewrites, so deep links reload on any static
 * host and under any base path (TC-4).
 */
function App() {
    return (
        <HashRouter>
            <ServicesProvider services={injectedServices}>
                <GlobalStateContextProvider>
                    <AppRoutes />
                </GlobalStateContextProvider>
            </ServicesProvider>
        </HashRouter>
    );
}

export default App;
