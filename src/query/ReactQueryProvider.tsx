import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useService } from '../services/provider/useService.ts';
import { LibraryProviderService } from '../services/LibraryProvider.service.ts';

export const ReactQueryProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [providersService] = useService([LibraryProviderService]);

    return (
        <QueryClientProvider client={providersService.queryClient}>
            {children}
        </QueryClientProvider>
    );
};
