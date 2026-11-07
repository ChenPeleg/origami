 
console.info('Running setup tests...');

// jsdom does not implement ResizeObserver; provide a no-op stub so that
// HeadlessUI components (Listbox, Menu, etc.) that rely on it don't throw.
globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
};
 
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
    cleanup();
});

if (!window.matchMedia) {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
}

if (!window.ResizeObserver) {
    window.ResizeObserver = class ResizeObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
    };
}

if (!Element.prototype.getAnimations) {
    Element.prototype.getAnimations = () => [];
}
 
