import { AbstractBaseService } from './provider/AbstractBaseService';
import { ServicesResolver } from './provider/ServiceResolverClass.ts';
import { appConfig } from '../config/appConfig.ts';
import { WindowService } from './Window.service.ts';

export class DevServiceService extends AbstractBaseService {
    private windowService: WindowService;

    constructor(servicesResolver: ServicesResolver) {
        super(servicesResolver);
        this.windowService = this.servicesResolver.getService(WindowService);
    }
    handleException(exception: unknown): void {
        console.error(exception);
    }
    changePortIfInLocalDevelopment(): void {
        if (
            appConfig.environment === 'development' &&
            this.windowService.window.location.port === '8000'
        ) {
            this.windowService.window.location.port = '3000';
        }
    }
}
