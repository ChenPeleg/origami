import type { ReactNode } from 'react';
import type { ServicesResolver } from '../../src/services/provider/ServiceResolverClass.ts';
import { ServicesProviderContext } from '../../src/services/provider/ServicesProvider';

export const TestsGlobalServicesProvider = ({
    children,
    serviceResolver,
}: {
    children: ReactNode;
    serviceResolver: ServicesResolver;
}) => {
    return (
        <ServicesProviderContext.Provider value={serviceResolver}>
            {children}
        </ServicesProviderContext.Provider>
    );
};
