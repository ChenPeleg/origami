import type { Decorator } from '@storybook/react-vite';
import { useEffect, useRef, type ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import { ServicesProvider } from '../../src/services/provider/ServicesProvider';
import { injectedServices } from '../../src/services/injection/injectedServices';
import {
    GlobalStateContextProvider,
    useGlobalState,
} from '../../src/stores/GlobalState';
import { Language } from '../../src/models/Language';

/** The toolbar direction also picks the language: RTL shows Hebrew. */
const StoryLanguage = ({
    language,
    children,
}: {
    language: Language;
    children: ReactNode;
}) => {
    const { setLanguage } = useGlobalState();
    const appliedLanguage = useRef<Language | null>(null);

    // Apply the toolbar choice once per change, so a story can still
    // switch the language itself (e.g. the language toggle).
    useEffect(() => {
        if (appliedLanguage.current !== language) {
            appliedLanguage.current = language;
            setLanguage(language);
        }
    });

    return <>{children}</>;
};

/**
 * App Providers Decorator for Storybook
 * Gives a story what app components need: router, services and global state,
 * on the birch table surface of the app.
 * Set `parameters.route` to start the story at a specific route.
 */
export const AppProvidersDecorator: Decorator = (Story, context) => {
    const language =
        context.globals.direction === 'rtl'
            ? Language.Hebrew
            : Language.English;
    const route: string = context.parameters.route ?? '/';

    return (
        <MemoryRouter initialEntries={[route]}>
            <ServicesProvider services={injectedServices}>
                <GlobalStateContextProvider>
                    <StoryLanguage language={language}>
                        <div className="bg-birch font-body text-ink p-8 text-[18px] leading-[1.55]">
                            <Story />
                        </div>
                    </StoryLanguage>
                </GlobalStateContextProvider>
            </ServicesProvider>
        </MemoryRouter>
    );
};
