import {
    ApiError,
    CreatePasswordResetLink,
    PasswordReset,
} from '@lightdash/common';
import { useMutation, useQuery } from '@tanstack/react-query';
import { lightdashApi } from '../api';
import useToaster from './toaster/useToaster';

const getPasswordResetLinkQuery = async (code: string): Promise<null> =>
    lightdashApi<null>({
        url: `/password-reset/${code}`,
        method: 'GET',
        body: undefined,
    });

const sendPasswordResetLinkQuery = async (
    data: CreatePasswordResetLink,
): Promise<null> =>
    lightdashApi<null>({
        url: `/password-reset`,
        method: 'POST',
        body: JSON.stringify(data),
    });

const resetPasswordQuery = async (data: PasswordReset): Promise<null> =>
    lightdashApi<null>({
        url: `/user/password/reset`,
        method: 'POST',
        body: JSON.stringify(data),
    });

export const usePasswordResetLink = (code: string) =>
    useQuery<null, ApiError>({
        queryKey: ['password_reset_link'],
        queryFn: () => getPasswordResetLinkQuery(code),
    });

export const usePasswordResetLinkMutation = () => {
    const { showToastError, showToastSuccess } = useToaster();
    return useMutation<null, ApiError, CreatePasswordResetLink>(
        sendPasswordResetLinkQuery,
        {
            mutationKey: ['send_password_reset_email'],
            onSuccess: async () => {
                showToastSuccess({
                    title: 'Password recovery email sent successfully',
                });
            },
            onError: (error) => {
                showToastError({
                    title: `Failed to send password recovery email`,
                    subtitle: error.error.message,
                });
            },
        },
    );
};

export const usePasswordResetMutation = () => {
    const { showToastError, showToastSuccess } = useToaster();
    return useMutation<null, ApiError, PasswordReset>(resetPasswordQuery, {
        mutationKey: ['reset_password'],
        onSuccess: async () => {
            showToastSuccess({
                title: 'Password updated successfully',
            });
        },
        onError: (error) => {
            showToastError({
                title: `Failed to reset password`,
                subtitle: error.error.message,
            });
        },
    });
};
