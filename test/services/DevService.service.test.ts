import { ServicesTestBed } from '../providers/ServicesTestBed.ts';
import { DevServiceService } from '../../src/services/DevService.service.ts';
import { WindowService } from '../../src/services/Window.service.ts';
import { beforeEach, describe, it, expect, vi } from 'vitest';

const mockAppConfig = vi.hoisted(() => ({ environment: 'test' as string }));

vi.mock('../../src/config/appConfig.ts', () => ({
    get appConfig() {
        return mockAppConfig;
    },
}));

describe('DevService service', () => {
    let testBed: ServicesTestBed;
    let service: DevServiceService;
    let windowService: WindowService;

    beforeEach(() => {
        mockAppConfig.environment = 'test';
        testBed = new ServicesTestBed([]);
        service = testBed.getServiceToTest(DevServiceService);
        windowService = testBed.getServiceToTest(WindowService);
        vi.clearAllMocks();
    });

    describe('changePortIfInLocalDevelopment', () => {
        it('should not change the port when the environment is not development', () => {
            // Given: test environment, port set to 8000 on the mock window
            mockAppConfig.environment = 'test';
            windowService.window.location.port = '8000';

            // When
            service.changePortIfInLocalDevelopment();

            // Then: port stays unchanged
            expect(windowService.window.location.port).toBe('8000');
        });

        it('should change port from 8000 to 3000 in development environment', () => {
            // Given: spy on the window getter so it returns a controllable mock
            // regardless of the environment check inside WindowService
            const mockLocation = { port: '8000', origin: 'http://localhost', href: '' };
            vi.spyOn(windowService, 'window', 'get').mockReturnValue({
                location: mockLocation,
                confirm: () => true,
            } as any);
            mockAppConfig.environment = 'development';

            // When
            service.changePortIfInLocalDevelopment();

            // Then
            expect(mockLocation.port).toBe('3000');
        });

        it('should not change the port when already on port 3000 in development', () => {
            // Given: spy on the window getter
            const mockLocation = { port: '3000', origin: 'http://localhost', href: '' };
            vi.spyOn(windowService, 'window', 'get').mockReturnValue({
                location: mockLocation,
                confirm: () => true,
            } as any);
            mockAppConfig.environment = 'development';

            // When
            service.changePortIfInLocalDevelopment();

            // Then: port stays 3000 (only changes when port is 8000)
            expect(mockLocation.port).toBe('3000');
        });
    });

    describe('handleException', () => {
        it('should call console.error with the given exception', () => {
            // Given
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            const error = new Error('dev error');

            // When
            service.handleException(error);

            // Then
            expect(consoleSpy).toHaveBeenCalledWith(error);

            consoleSpy.mockRestore();
        });
    });
});
