import { BrowserRouter } from 'react-router';

import { ReactQueryProvider } from './query/ReactQueryProvider.tsx';
import { ServicesProvider } from './services/provider/ServicesProvider.tsx';
import { injectedServices } from './services/injection/injectedServices.ts';
import { GlobalStateContextProvider } from './stores/GlobalState.tsx';
import { UserProvider } from './stores/UserContext.tsx';
import { AppRoutes } from './AppRoutes.tsx';
import { ToastProvider } from './common';
import { AppModalNotice } from './layouts/AppModalNotice.tsx';

function App() {
    return (
        <BrowserRouter>
            <ServicesProvider services={injectedServices}>
                <ReactQueryProvider>
                    <GlobalStateContextProvider>
                        <UserProvider>
                            <ToastProvider>
                                <AppModalNotice>
                                    <AppRoutes />
                                </AppModalNotice>
                            </ToastProvider>
                        </UserProvider>
                    </GlobalStateContextProvider>
                </ReactQueryProvider>
            </ServicesProvider>
        </BrowserRouter>
    );
}

export default App;
