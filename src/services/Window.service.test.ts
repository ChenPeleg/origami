import { describe, expect, it, vi } from 'vitest';
import { ServicesResolver } from './provider/ServiceResolverClass.ts';
import { WindowService } from './Window.service.ts';

vi.mock('../config/appConfig.ts', () => ({
    appConfig: {
        environment: 'test',
    },
}));

describe('WindowService', () => {
    it('uses the mock implementation in test mode', () => {
        const windowService = new ServicesResolver([WindowService]).getService(
            WindowService
        );

        expect(windowService.window.confirm('confirm?')).toBe(true);
        expect(windowService.window.location.origin).toBe('http://localhost');
        expect(windowService.window.location.port).toBe('3000');
    });

    it('updates location href and port through the service', () => {
        const windowService = new ServicesResolver([WindowService]).getService(
            WindowService
        );

        windowService.window.location.port = '8000';
        windowService.window.location.href = 'http://localhost:8000/admin/';

        expect(windowService.window.location.port).toBe('8000');
    });
});
