import type { ReactNode } from 'react';
import React, { createContext, useContext, useState } from 'react';
import { Language } from '../models/Language.ts';
import { useService } from '../services/provider/useService.ts';
import { TranslationService } from '../services/Translation.service.ts';

export interface GlobalState {
    language: Language;
}

interface GlobalStateType {
    globalState: GlobalState;
    setLanguage: (language: Language) => void;
    setGlobalState: (globalState: GlobalState) => void;
}

const GlobalStateContext = createContext<GlobalStateType | undefined>(
    undefined
);

export const GlobalStateContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const translationService = useService(TranslationService);
    const [globalState, setGlobalState] = useState<GlobalState>(() => ({
        language: translationService.resolveInitialLanguage(),
    }));

    const setLanguage = (language: Language) => {
        setGlobalState((prevState) => ({
            ...prevState,
            language,
        }));
    };

    return (
        <GlobalStateContext.Provider
            value={{
                globalState,
                setGlobalState,
                setLanguage,
            }}
        >
            {children}
        </GlobalStateContext.Provider>
    );
};

/**
 * Hook to use global state context
 * @throws Error if used outside GlobalStateContextProvider
 */
export const useGlobalState = (): GlobalStateType => {
    const context = useContext(GlobalStateContext);
    if (context === undefined) {
        throw new Error(
            'useGlobalState must be used within a GlobalStateContextProvider'
        );
    }
    return context;
};
