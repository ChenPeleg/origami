import type { ReactNode } from 'react';
import React, { createContext, useContext, useState } from 'react';
import { Language } from '../models/Language.ts';

export type Theme = 'light' | 'dark';

export interface GlobalState {
    language: Language;
    theme: Theme;
}

interface GlobalStateType {
    globalState: GlobalState;
    setLanguage: (language: Language) => void;
    setTheme: (theme: Theme) => void;
    setGlobalState: (globalState: GlobalState) => void;
}

const GlobalStateContext = createContext<GlobalStateType | undefined>(
    undefined
);

export const GlobalStateContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [globalState, setGlobalState] = useState<GlobalState>({
        language: Language.Hebrew,
        theme: 'light',
    });

    const setLanguage = (language: Language) => {
        setGlobalState((prevState) => ({
            ...prevState,
            language,
        }));
    };

    const setTheme = (theme: Theme) => {
        setGlobalState((prevState) => ({
            ...prevState,
            theme,
        }));
    };

    return (
        <GlobalStateContext.Provider
            value={{
                globalState,
                setGlobalState,
                setLanguage,
                setTheme,
            }}
        >
            {children}
        </GlobalStateContext.Provider>
    );
};

/**
 * Hook to use global state context
 * @throws Error if used outside UserProvider
 */
export const useGlobalState = (): GlobalStateType => {
    const context = useContext(GlobalStateContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
