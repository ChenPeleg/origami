import {
    type ServiceInjectionMethod,
    ServicesResolver,
} from '../../src/services/provider/ServiceResolverClass.ts';

export class ExtendedTestsServicesResolver extends ServicesResolver {
    public overrideServices(services: Array<ServiceInjectionMethod>): void {
        this.addServices(services);
    }
}
