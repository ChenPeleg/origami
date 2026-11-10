import { AbstractBaseService } from './provider/AbstractBaseService';
import { ServicesResolver } from './provider/ServiceResolverClass';
import { appConfig } from '../config/appConfig.ts';
import { EnvironmentType } from '../models/environmentType.ts';
import { WindowMock } from '../../test/mocks/window.mock.ts';

type WindowLike = Pick<Window, 'location' | 'confirm' | 'scrollTo'> & {
    document: Pick<Document, 'documentElement' | 'title'>;
    navigator: Pick<Navigator, 'language'>;
};

export class WindowService extends AbstractBaseService {
    private readonly windowMock = new WindowMock() as unknown as WindowLike;

    constructor(servicesResolver: ServicesResolver) {
        super(servicesResolver);
    }

    public get window(): WindowLike {
        switch (appConfig.environment as EnvironmentType) {
            case EnvironmentType.Test: {
                return this.windowMock;
            }
            case EnvironmentType.Development:
            case EnvironmentType.Production:
            case EnvironmentType.Staging:
            default:
                return window;
        }
    }
}
