import type { ServiceInjectionMethod } from '../provider/ServiceResolverClass';
import { LocalStorageService } from '../LocalStorage.service.ts';
import { LoggingService } from '../Logging.service.ts';
import { VersionService } from '../Version.service.ts';
import { TranslationService } from '../Translation.service.ts';
import { FormsDataService } from '../FormsData.service.ts';
import { LibraryProviderService } from '../LibraryProvider.service.ts';
import { ApiService } from '../Api.service.ts';
import { ExceptionService } from '../Exception.service.ts';
import { UserService } from '../User.service.ts';
import { DevServiceService } from '../DevService.service.ts';
import { WindowService } from '../Window.service.ts';

export const injectedServices: ServiceInjectionMethod[] = [
    LibraryProviderService,
    ApiService,
    FormsDataService,
    TranslationService,
    LocalStorageService,
    LoggingService,
    VersionService,
    ExceptionService,
    WindowService,
    UserService,
    DevServiceService,
];
