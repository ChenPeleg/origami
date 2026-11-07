import type { AppConfiguration } from '../models/AppConfiguration';
import { EnvironmentType } from '../models/environmentType';

export const testAppConfig: AppConfiguration = {
    environment: EnvironmentType.Test,
    isDevelopment: false,
    features: {
        $$deprecated_peulaUnitExpanded: false,
    },
};
