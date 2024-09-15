import { apiCall } from "../func/api";

interface EditProfileResponse {
    success: boolean;
}

export const editProfile = async (name: string, email: string, token: string): Promise<EditProfileResponse> => {
    const data = { name, email };
    return apiCall<EditProfileResponse>('/api/profile', 'PUT', data, token);
};

interface ChangePasswordResponse {
    success: boolean;
}

export const changePassword = async (oldPassword: string, newPassword: string, token: string): Promise<ChangePasswordResponse> => {
    const data = { oldPassword, newPassword };
    return apiCall<ChangePasswordResponse>('/api/change-password', 'PUT', data, token);
};
