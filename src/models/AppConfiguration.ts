import { EnvironmentType } from './environmentType';

export interface AppConfiguration {
    environment: EnvironmentType;
    isDevelopment: boolean;
    features: {
        $$deprecated_peulaUnitExpanded: boolean;
    };
}
