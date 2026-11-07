import { useUser } from '../stores/UserContext.tsx';
import React, { useLayoutEffect } from 'react';
import { AppButton, AppModal } from '../common';
import { UserService } from '../services/User.service.ts';
import { useService } from '../services/provider/useService.ts';

export const AppModalNotice = ({ children }: { children: React.ReactNode }) => {
    const [userService] = useService([UserService]);

    const [wasLoggedOut, setWasLoggedOut] = React.useState(false);

    const { user } = useUser();

    useLayoutEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setWasLoggedOut(!user);
    }, [user]);

    return (
        <>
            {children}
            {wasLoggedOut && (
                <AppModal
                    isOpen={wasLoggedOut}
                    onClose={() => {
                        userService.navigateToLogin();
                    }}
                    title="ההפעלה פגה"
                    size="sm"
                    showCloseButton={false}
                >
                    <div className="space-y-4">
                        <p className="text-gray-600 text-sm leading-relaxed">
                            ההפעלה שלך פגה. אנא התחבר שוב כדי להמשיך.
                        </p>
                        <div className="flex justify-end">
                            <AppButton
                                type="button"
                                variant="primary"
                                onClick={() => userService.navigateToLogin()}
                            >
                                חזור להתחברות
                            </AppButton>
                        </div>
                    </div>
                </AppModal>
            )}
        </>
    );
};
