import { ExtendedTestsServicesResolver } from './ServicesTestBedResolver';

import type {
    ServiceConstructorClass,
    ServiceInjectionMethod,
} from '../../src/services/provider/ServiceResolverClass.ts';
import { InjectedServicesMock } from './InjectedServicesMock.ts';
import { APIServiceMock } from '../mocks/ApiServiceMock.ts';
import type { GeneratedApi } from '../../src/generated/GeneratedApi.ts';
import { AppDataMock } from '../mocks/AppDataMock.ts';
import { ApiService } from '../../src/services/Api.service.ts';

export class ServicesTestBed {
    public serviceResolver: ExtendedTestsServicesResolver;
    private get apiService() {
        const apiService = this.serviceResolver.getService(ApiService);
        if (apiService instanceof APIServiceMock) {
            return apiService;
        }
        throw 'Api service is not mocked, please use setAPIMock or add APIServiceMock to the override services';
    }
    constructor(overrideServices: Array<ServiceInjectionMethod>) {
        const initialServicesList = new InjectedServicesMock(overrideServices)
            .services;
        this.serviceResolver = new ExtendedTestsServicesResolver(
            initialServicesList
        );
    }
    getServiceToTest<T extends ServiceConstructorClass>(service: T) {
        return this.serviceResolver.getService(
            service
        ) satisfies InstanceType<T>;
    }
    seedSystemDefaults(appDataMock = new AppDataMock()) {
        this.apiService.mockApi(this.apiService.defaultMocks(appDataMock));
    }
    setAPIMock(mock: Partial<GeneratedApi<unknown>>) {
        const apiService = this.serviceResolver.getService(ApiService);
        if (apiService instanceof APIServiceMock) {
            apiService.mockApi(mock);
            return;
        }
        this.serviceResolver.overrideServices([
            {
                provide: ApiService,
                useClass: APIServiceMock,
            },
        ]);
        const mockApiService = this.serviceResolver.getService(
            ApiService
        ) as APIServiceMock;
        mockApiService.mockApi(mock);
    }
}
