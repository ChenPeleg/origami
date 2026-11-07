import { AbstractBaseService } from './provider/AbstractBaseService';
import { ServicesResolver } from './provider/ServiceResolverClass';
import { EnvironmentType } from '../models/environmentType';
import { LocalStorageService } from './LocalStorage.service';
import { appConfig } from '../config/appConfig.ts';

export class LoggingService extends AbstractBaseService {
    environment: EnvironmentType;
    private lsKey = 'app_silent_logs';
    private _consoleImp: Console;

    constructor(servicesResolver: ServicesResolver) {
        const environment = appConfig.environment;
        if (!environment) {
            throw new Error('Environment is required');
        }
        super(servicesResolver);
        this.environment = environment;
        this._consoleImp = console;
    }

    get lsService() {
        return this.servicesResolver.getService(LocalStorageService);
    }

    silentLog(...args: unknown[]) {
        const currentLogs = this.lsService.getObjectOrNull(this.lsKey) || [];
        currentLogs.push({ data: args, timestamp: new Date().toISOString() });
        this.lsService.setItem(this.lsKey, JSON.stringify(currentLogs));
    }

    log(...args: unknown[]) {
        this._consoleImp.log(args);
    }

    error(...args: unknown[]) {
        this._consoleImp.error(args);
    }
}
