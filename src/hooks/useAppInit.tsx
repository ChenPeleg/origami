import { useService } from '../services/provider/useService.ts';
import { useEffect } from 'react';
import { useUser } from '../stores/UserContext.tsx';
import { useNavigate } from 'react-router';
import { UserService } from '../services/User.service.ts';
import { DevServiceService } from '../services/DevService.service.ts';

export const useAppInit = () => {
    const [userService, devService] = useService([
        UserService,
        DevServiceService,
    ]);
    const { setUser, clearUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        devService.changePortIfInLocalDevelopment();
        userService
            .fetchCurrentUser()
            .then((user) => {
                if (user) {
                    setUser(user);
                    userService.saveUserToLocalStorage(user);
                }
            })
            .catch((error) => {
                clearUser();
                userService.clearUserFromLocalStorage();
                if (error.status === 403) {
                    navigate('/logged-out');
                }
            });
    }, []);

    return {};
};
