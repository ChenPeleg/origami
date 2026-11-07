import { AbstractBaseService } from './provider/AbstractBaseService';
import { ServicesResolver } from './provider/ServiceResolverClass.ts';

export class ExceptionService extends AbstractBaseService {
    constructor(servicesResolver: ServicesResolver) {
        super(servicesResolver);
    }
    handleException(exception: unknown): void {
        console.error(exception);
    }
}
