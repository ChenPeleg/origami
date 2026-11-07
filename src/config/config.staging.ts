import type { AppConfiguration } from '../models/AppConfiguration';
import { EnvironmentType } from '../models/environmentType';

export const stagingAppConfig: AppConfiguration = {
    environment: EnvironmentType.Staging,
    isDevelopment: false,
    features: {
        $$deprecated_peulaUnitExpanded: true,
    },
};
