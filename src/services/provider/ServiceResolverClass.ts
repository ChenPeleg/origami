import { AbstractBaseService } from './AbstractBaseService';
import { LocalStorageService } from '../LocalStorage.service.ts';
import { FormsDataService } from '../FormsData.service.ts';
import { LoggingService } from '../Logging.service.ts';
import { VersionService } from '../Version.service.ts';
import { TranslationService } from '../Translation.service.ts';
import { WindowService } from '../Window.service.ts';

/**
 * Type representing a constructor for a service class. The service class must extend `AbstractBaseService`.
 */

export type ServiceConstructorClass = new (
    ...args: any[]
) => AbstractBaseService;

/**
 * Type representing a constructor for a service class.
 * @property {unknown} provide - The token to provide the service. can have any value.
 * @property {ServiceConstructorClass} useClass - The class to use for the service ( must extend `AbstractBaseService`).
 */
export type ServiceWithSpecificToken = {
    provide: unknown;
    useClass: ServiceConstructorClass;
};

/**
 * Type representing a service with a factory function.
 * Normally used when the service requires some configuration.
 * @property {unknown} provide - The token to provide the service. can have any value.
 * @property {(serviceResolver: ServicesResolver) => AbstractBaseService} useFactory - The factory function to create the service and must contain a serviceResolver as parameter.
 */
export type ServiceWithFactoryFunction = {
    provide: unknown;
    useFactory: (serviceResolver: ServicesResolver) => AbstractBaseService;
};

/**
 * Type representing a method to inject a service. Can be a class, a class with a specific token or a factory function.
 */
export type ServiceInjectionMethod =
    | ServiceConstructorClass
    | ServiceWithSpecificToken
    | ServiceWithFactoryFunction;

/**
 * Responsible for resolving and providing services.
 * It initializes the services and makes them available to the application.
 */
export class ServicesResolver {
    private _servicesMap = new Map<
        unknown,
        InstanceType<ServiceConstructorClass>
    >();

    constructor(services: Array<ServiceInjectionMethod>) {
        this.addServices(services);
    }

    public getService<T extends ServiceConstructorClass>(
        service: T
    ): InstanceType<T> {
        if (!this._servicesMap.has(service)) {
            throw new Error(
                `[ServicesResolver] Service ${service.name || service} does not exist`
            );
        }
        return this._servicesMap.get(service) as InstanceType<T>;
    }

    // Convenience getters for commonly used services
    get localStorageService(): LocalStorageService {
        return this.getService(LocalStorageService);
    }

    get formsDataService(): FormsDataService {
        return this.getService(FormsDataService);
    }

    get loggingService(): LoggingService {
        return this.getService(LoggingService);
    }

    get versionService(): VersionService {
        return this.getService(VersionService);
    }

    get translationService(): TranslationService {
        return this.getService(TranslationService);
    }

    get windowService(): WindowService {
        return this.getService(WindowService);
    }

    protected addServices(services: Array<ServiceInjectionMethod>) {
        services.forEach((service) => {
            if ('useClass' in service) {
                this._servicesMap.set(
                    service.provide,
                    new service.useClass(this)
                );
                return;
            } else if ('useFactory' in service) {
                this._servicesMap.set(
                    service.provide,
                    service.useFactory(this)
                );
                return;
            } else if (service) {
                this._servicesMap.set(service, new service(this));
            } else {
                throw new Error(
                    '[ServicesResolver] Invalid service definition'
                );
            }
        });
    }
}
