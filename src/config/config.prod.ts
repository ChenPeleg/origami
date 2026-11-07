import type { AppConfiguration } from '../models/AppConfiguration';
import { EnvironmentType } from '../models/environmentType';

export const prodAppConfig: AppConfiguration = {
    environment: EnvironmentType.Production,
    isDevelopment: false,
    features: {
        $$deprecated_peulaUnitExpanded: false,
    },
};
