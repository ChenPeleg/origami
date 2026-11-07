import { ServicesResolver } from './provider/ServiceResolverClass';
import { AbstractBaseService } from './provider/AbstractBaseService';

import { EnvironmentType } from '../models/environmentType';
import { LocalStorageMock } from '../../test/mocks/localStorage.mock.ts';
import { appConfig } from '../config/appConfig.ts';

export class LocalStorageService extends AbstractBaseService {
    static userLsKey = 'userLsKey';

    private _localStorage: Storage;

    constructor(provider: ServicesResolver) {
        super(provider);
        const environment = appConfig.environment;
        this._localStorage = this.setStorageByEnvironment(environment);
    }

    private setStorageByEnvironment(environment: EnvironmentType): Storage {
        switch (environment) {
            case EnvironmentType.Test: {
                return new LocalStorageMock() as unknown as Storage;
            }
            case EnvironmentType.Development:
            case EnvironmentType.Production:
            default:
                return localStorage;
        }
    }

    getObjectOrNull(key: string) {
        try {
            const item = this._localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch {
            return null;
        }
    }

    getItem(key: string) {
        return this._localStorage.getItem(key);
    }

    setItem(keyName: string, keyValue: string) {
        this._localStorage.setItem(keyName, keyValue);
    }

    removeItem(key: string) {
        this._localStorage.removeItem(key);
    }
}
