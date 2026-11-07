import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 3000,
        proxy: {
            '/authentication': {
                target: 'http://localhost:8000',
                changeOrigin: true,
            },
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
            },
        },
    },

    define: {
        'import.meta.env.VITE_BUILD_EPOC_DATE': JSON.stringify(
            new Date().getTime()
        ),
        'import.meta.env.VITE_APP_VERSION': JSON.stringify(
            process.env.npm_package_version
        ),
    },
});
