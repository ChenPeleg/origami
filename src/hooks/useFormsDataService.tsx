import { useContext } from 'react';
import { ServicesProviderContext } from '../services/provider/ServicesProvider';
import type { FormsDataService } from '../services/FormsData.service';

/**
 * Hook to access FormsDataService
 * Provides direct access to the forms data service for managing activity forms
 * @returns FormsDataService instance
 * @throws Error if used outside ServicesProvider
 */
export const useFormsDataService = (): FormsDataService => {
    const servicesResolver = useContext(ServicesProviderContext);
    if (!servicesResolver) {
        throw new Error(
            'useFormsDataService must be used within a ServicesProvider'
        );
    }
    return servicesResolver.formsDataService;
};
