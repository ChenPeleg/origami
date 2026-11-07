import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
            },
        },
    },
    test: {
        projects: [
            {
                extends: true,
                test: {
                    name: 'unit',
                    setupFiles: ['./test/init/setup.tests.ts'],
                    globals: true,
                    environment: 'jsdom',
                    includeSource: ['src/**/*.{js,jsx,ts,tsx}', 'tests/**/*'],
                    exclude: [
                        'e2e',
                        'node_modules',
                        'dist',
                        '.idea',
                        '.git',
                        '.cache',
                        'tests/e2e/**/*',
                    ],
                },
            },
            {
                extends: true,
                plugins: [storybookTest({ configDir: '.storybook' })],
                test: {
                    name: 'storybook',
                    browser: {
                        enabled: true,
                        headless: true,
                        provider: playwright(),
                        instances: [{ browser: 'chromium' }],
                    },
                    setupFiles: ['.storybook/vitest.setup.ts'],
                },
            },
        ],
    },
});
