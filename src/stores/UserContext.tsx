import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { useService } from '../services/provider/useService.ts';
import { LocalStorageService } from '../services/LocalStorage.service.ts';

/**
 * User data types
 */
export enum UserRole {
    Member = 'member',
    Leader = 'leader',
    Admin = 'admin',
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

/**
 * User context state and actions
 */
interface UserContextType {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * User Context Provider
 * Manages user authentication and profile data
 */
export const UserProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [localStorageService] = useService([LocalStorageService]);
    const initialState = localStorageService.getObjectOrNull(
        LocalStorageService.userLsKey
    );
    const [user, setUserState] = useState<User | null>(initialState ?? null);

    const setUser = (user: User) => {
        setUserState(user);
    };

    const clearUser = () => {
        setUserState(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

/**
 * Hook to use user context
 * @throws Error if used outside UserProvider
 */
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
