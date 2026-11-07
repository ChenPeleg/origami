import { AbstractBaseService } from './provider/AbstractBaseService';
import { ServicesResolver } from './provider/ServiceResolverClass.ts';
import { QueryClient } from '@tanstack/react-query';

export class LibraryProviderService extends AbstractBaseService {
    private readonly _queryClient: QueryClient;

    constructor(servicesResolver: ServicesResolver) {
        super(servicesResolver);
        this._queryClient = new QueryClient();
    }
    get queryClient() {
        return this._queryClient;
    }
}
