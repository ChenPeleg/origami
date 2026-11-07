import { AppDataMock } from './AppDataMock';
import type { GeneratedApi } from '../../src/generated/GeneratedApi.ts';

export class AppApiDefaultMocks {
    private appDataMock: AppDataMock;
    constructor(_appDataMock: AppDataMock) {
        this.appDataMock = _appDataMock || new AppDataMock();
    }
    getDefaultApiMocks(): Partial<GeneratedApi<unknown>> {
        const data = this.appDataMock.getAppData();
        return {
            data,
        } as any;
    }
}
