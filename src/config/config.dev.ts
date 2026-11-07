import type { AppConfiguration } from '../models/AppConfiguration';
import { EnvironmentType } from '../models/environmentType';

export const devAppConfig: AppConfiguration = {
    environment: EnvironmentType.Development,
    isDevelopment: true,
    features: {
        $$deprecated_peulaUnitExpanded: true,
    },
};
