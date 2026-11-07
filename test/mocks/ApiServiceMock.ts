import { ApiService } from '../../src/services/Api.service.ts';
import { GeneratedApi, HttpClient } from '../../src/generated/GeneratedApi.ts';
import type { ServicesResolver } from '../../src/services/provider/ServiceResolverClass.ts';
import { AppDataMock } from './AppDataMock.ts';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AppApiDefaultMocks } from './AppApiDefaultMocks.ts';

export const axiosInstanceGenericResponse = {
    data: null as any,
    status: 200,
    statusText: 'ok',
    headers: {} as any,
    config: {} as AxiosRequestConfig,
};

type RequestMock = <T = any, R = AxiosResponse<T, any>, D = any>(
    config: AxiosRequestConfig<D>
) => Promise<R>;

export const genericAxiosVerbMock: RequestMock = async <R, D>(
    config?: AxiosRequestConfig<D>
) => {
    console.warn(
        `unmocked api call: ${config?.method} ${config?.url} - consider adding a mock`
    );
    return {
        ...axiosInstanceGenericResponse,
        config: config,
    } as any as Promise<R>;
};

export class APIServiceMock extends ApiService {
    private readonly _fakeApi: GeneratedApi<any>;
    private readonly _defaultAppDataMock: AppDataMock;

    constructor(servicesResolver: ServicesResolver) {
        super(servicesResolver);
        this._fakeApi = this.fakeApiClientFactory();

        this._defaultAppDataMock = new AppDataMock();
    }

    get api() {
        return this._fakeApi.api;
    }

    get auth() {
        return this._fakeApi.authentication;
    }

    defaultMocks(appDataMock?: AppDataMock) {
        const mocker = new AppApiDefaultMocks(
            appDataMock || this._defaultAppDataMock
        );
        return mocker.getDefaultApiMocks();
    }

    fakeApiClientFactory() {
        const httpClient = new HttpClient({
            baseURL: import.meta.env.VITE_API_URL,
            paramsSerializer: {
                serialize: (params) => {
                    return this.serializeParams(params);
                },
            },
        });
        httpClient.instance.request = genericAxiosVerbMock;

        return new GeneratedApi(httpClient);
    }

    mockApi(mock: Partial<GeneratedApi<unknown>>) {
        Object.keys(mock).forEach((key: any) => {
            if (typeof (mock as any)[key] === 'function') {
                (this._fakeApi as any)[key] = (mock as any)[key];
            } else {
                (this._fakeApi as any)[key] = {
                    ...(this._fakeApi as any)[key],
                    ...(mock as any)[key],
                };
            }
        });
    }
}
