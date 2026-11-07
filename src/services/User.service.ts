import { AbstractBaseService } from './provider/AbstractBaseService';
import { ServicesResolver } from './provider/ServiceResolverClass.ts';
import { ApiService } from './Api.service.ts';
import { LocalStorageService } from './LocalStorage.service.ts';
import { ExceptionService } from './Exception.service.ts';
import { WindowService } from './Window.service.ts';
import type { User } from '../stores/UserContext.tsx';
import { UserRole } from '../stores/UserContext.tsx';
import { appConfig } from '../config/appConfig.ts';

export class UserService extends AbstractBaseService {
    private apiService: ApiService;
    private localStorageService: LocalStorageService;
    private exceptionService: ExceptionService;
    private windowService: WindowService;

    constructor(servicesResolver: ServicesResolver) {
        super(servicesResolver);
        this.apiService = this.servicesResolver.getService(ApiService);
        this.localStorageService =
            this.servicesResolver.getService(LocalStorageService);
        this.exceptionService =
            this.servicesResolver.getService(ExceptionService);
        this.windowService = this.servicesResolver.getService(WindowService);
    }

    /**
     * Fetch the current authenticated user from the API
     * @returns User object or null if fetch fails
     * @throws Error with status property if API call fails
     */
    async fetchCurrentUser(): Promise<User | null> {
        try {
            const res =
                await this.apiService.auth.authenticationUsersMeRetrieve();

            if (!res.data) {
                return null;
            }

            return this.transformDtoToUser(res.data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw error;
            }
            this.exceptionService.handleException(error);
            throw error;
        }
    }

    /**
     * Transform API DTO to User model
     */
    private transformDtoToUser(userDto: any): User {
        return {
            id: userDto.id.toString(),
            name: `${userDto.first_name} ${userDto.last_name}`,
            role: UserRole.Member,
            email: userDto.email,
        };
    }

    /**
     * Save user data to localStorage
     */
    saveUserToLocalStorage(user: User): void {
        this.localStorageService.setItem(
            LocalStorageService.userLsKey,
            JSON.stringify(user)
        );
    }

    /**
     * Clear user data from localStorage
     */
    clearUserFromLocalStorage(): void {
        this.localStorageService.setItem(LocalStorageService.userLsKey, '');
    }

    /**
     * Logout the current user
     * Clears the session and redirects to login page
     */
    async logout(): Promise<void> {
        try {
            // Call logout endpoint to clear session on backend
            await this.apiService.httpClient.instance.post(
                'authentication/logout/',
                {}
            );
        } catch (error) {
            console.error('Logout API call failed:', error);
        } finally {
            this.clearUserFromLocalStorage();
            this.navigateToLogin();
        }
    }
    navigateToAdmin(): void {
        if (appConfig.environment === 'development') {
            const url = new URL('admin/', this.windowService.window.location.origin);
            url.port = '8000';
            this.windowService.window.location.href = url.href;
        } else {
            this.windowService.window.location.href =
                import.meta.env.VITE_API_BASE_URL + 'admin/';
        }
    }
    getUserInitials(user: User) {
        if (!user) {
            return '?';
        }
        if (user.name.trim()) {
            return user.name
                .split(' ')
                .map((part) => part[0])
                .join('')
                .toUpperCase();
        }
        return user.email.at(0)?.toUpperCase() || '?';
    }

    navigateToLogin(): void {
        if (appConfig.environment === 'development') {
            const url = new URL(
                'authentication/login/',
                this.windowService.window.location.origin
            );
            url.port = '8000';
            this.windowService.window.location.href = url.href;
        } else {
            this.windowService.window.location.href =
                import.meta.env.VITE_API_BASE_URL + 'authentication/login/';
        }
    }
}
