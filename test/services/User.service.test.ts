import { ServicesTestBed } from '../providers/ServicesTestBed.ts';
import { UserService } from '../../src/services/User.service.ts';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import type { UserDto } from '../../src/generated/GeneratedApi.ts';
import { UserRole } from '../../src/stores/UserContext.tsx';
import { axiosInstanceGenericResponse } from '../mocks/ApiServiceMock.ts';

describe('User service', () => {
    let testBed: ServicesTestBed;
    let service: UserService;

    beforeEach(() => {
        testBed = new ServicesTestBed([]);
        service = testBed.getServiceToTest(UserService);
        vi.clearAllMocks();
    });

    describe('fetchCurrentUser', () => {
        it('should successfully fetch and transform user data from API', async () => {
            // Given: Mock API returns valid user data
            const mockUserDto: UserDto = {
                id: 123,
                username: 'john.doe',
                email: 'john.doe@example.com',
                first_name: 'John',
                last_name: 'Doe',
            };

            testBed.setAPIMock({
                authentication: {
                    authenticationUsersMeRetrieve: vi.fn().mockResolvedValue({
                        ...axiosInstanceGenericResponse,
                        data: mockUserDto,
                    }),
                },
            });

            // When: Fetching current user
            const result = await service.fetchCurrentUser();

            // Then: Returns correctly transformed User object
            expect(result).toEqual({
                id: '123',
                name: 'John Doe',
                email: 'john.doe@example.com',
                role: UserRole.Member,
            });
        });

        it('should return null when API returns no data', async () => {
            // Given: Mock API returns null data
            testBed.setAPIMock({
                authentication: {
                    authenticationUsersMeRetrieve: vi.fn().mockResolvedValue({
                        ...axiosInstanceGenericResponse,
                        data: null,
                    }),
                },
            });

            // When: Fetching current user
            const result = await service.fetchCurrentUser();

            // Then: Returns null
            expect(result).toBeNull();
        });

        it('should throw error when API call fails', async () => {
            // Given: Mock API throws an error
            const mockError = new Error('API request failed');
            testBed.setAPIMock({
                authentication: {
                    authenticationUsersMeRetrieve: vi
                        .fn()
                        .mockRejectedValue(mockError),
                },
            });

            // When/Then: Should throw the error
            await expect(service.fetchCurrentUser()).rejects.toThrow(
                'API request failed'
            );
        });

        it('should handle user with empty first and last names', async () => {
            // Given: Mock API returns user with empty names
            const mockUserDto: UserDto = {
                id: 456,
                username: 'jane.smith',
                email: 'jane.smith@example.com',
                first_name: '',
                last_name: '',
            };

            testBed.setAPIMock({
                authentication: {
                    authenticationUsersMeRetrieve: vi.fn().mockResolvedValue({
                        ...axiosInstanceGenericResponse,
                        data: mockUserDto,
                    }),
                },
            });

            // When: Fetching current user
            const result = await service.fetchCurrentUser();

            // Then: Returns user with space-separated empty names
            expect(result).toEqual({
                id: '456',
                name: ' ',
                email: 'jane.smith@example.com',
                role: UserRole.Member,
            });
        });

        it('should handle user with missing optional name fields', async () => {
            // Given: Mock API returns user without first_name and last_name
            const mockUserDto: UserDto = {
                id: 789,
                username: 'anonymous',
                email: 'anonymous@example.com',
            };

            testBed.setAPIMock({
                authentication: {
                    authenticationUsersMeRetrieve: vi.fn().mockResolvedValue({
                        ...axiosInstanceGenericResponse,
                        data: mockUserDto,
                    }),
                },
            });

            // When: Fetching current user
            const result = await service.fetchCurrentUser();

            // Then: Returns user with 'undefined undefined' as name
            expect(result).toEqual({
                id: '789',
                name: 'undefined undefined',
                email: 'anonymous@example.com',
                role: UserRole.Member,
            });
        });
    });
});
