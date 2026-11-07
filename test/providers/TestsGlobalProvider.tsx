import React, { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';
import { testQueryClient } from './testQueryClient';
import { TestsGlobalServicesProvider } from './TestsGlobalServicesProvider';
import type { ServicesResolver } from '../../src/services/provider/ServiceResolverClass.ts';
import { GlobalStateContextProvider } from '../../src/stores/GlobalState.tsx';
import { UserProvider } from '../../src/stores/UserContext.tsx';

export const TestsGlobalProvider = ({
    children,
    serviceResolver,
}: {
    children: React.ReactNode;
    serviceResolver: ServicesResolver;
}) => {
    useEffect(() => {
        testQueryClient.clear();
    }, []);

    return (
        <MemoryRouter>
            <TestsGlobalServicesProvider serviceResolver={serviceResolver}>
                <QueryClientProvider client={testQueryClient}>
                    <GlobalStateContextProvider>
                        <UserProvider>{children}</UserProvider>
                    </GlobalStateContextProvider>
                </QueryClientProvider>
            </TestsGlobalServicesProvider>
        </MemoryRouter>
    );
};
