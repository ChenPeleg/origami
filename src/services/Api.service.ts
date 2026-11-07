import { type AxiosResponse } from 'axios';
import { AbstractBaseService } from './provider/AbstractBaseService';
import { ServicesResolver } from './provider/ServiceResolverClass.ts';
import { GeneratedApi, HttpClient } from '../generated/GeneratedApi.ts';

export class ApiService extends AbstractBaseService {
    private readonly _api: GeneratedApi<unknown>;
    private axiosConfig = {
        baseURL: import.meta.env.VITE_API_BASE_URL || '',
        paramsSerializer: {
            serialize: (params: Record<string, string>) => {
                return this.serializeParams(params);
            },
        },
    };

    constructor(servicesResolver: ServicesResolver) {
        super(servicesResolver);
        const httpClient = this.createHttpClientForGeneratedApi();
        httpClient.instance.interceptors.response.handlers = [
            {
                fulfilled: (res) => this.onFulfilled(res),
                rejected: (res) => this.onRejected(res),
                synchronous: false,
            },
        ];
        const generatedApiClient = this.createApiFromHttpClient(httpClient);
        this._api = generatedApiClient;
    }

    get api() {
        return this._api.api;
    }
    get auth() {
        return this._api.authentication;
    }
    get httpClient() {
        return this._api.http;
    }

    protected serializeParams(params: Record<string, string>) {
        const queryString: string[] = [];

        for (const key in params) {
            // eslint-disable-next-line no-prototype-builtins
            if (params.hasOwnProperty(key)) {
                const value = params[key];

                if (Array.isArray(value)) {
                    value.forEach((item: string) => {
                        queryString.push(
                            `${encodeURIComponent(key)}=${encodeURIComponent(item)}`
                        );
                    });
                } else {
                    queryString.push(
                        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
                    );
                }
            }
        }

        return `${queryString.join('&')}`;
    }
    private createHttpClientForGeneratedApi() {
        const axiomConfig = this.axiosConfig;

        return new HttpClient<any>({ ...axiomConfig });
    }
    private createApiFromHttpClient(httpClient: HttpClient) {
        return new GeneratedApi(httpClient);
    }

    private onFulfilled(res: AxiosResponse<any, any, any>) {
        if (res.status === 401) {
            this.handleUnauthorized();
        }
        return res;
    }

    private handleUnauthorized() {}

    private onRejected(res: any) {
        if (res && res.status === 401) {
            this.handleUnauthorized();
        }
        throw res;
    }
}
