import { apiCall } from "../func/api";

interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    email: string;
    _id: string
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiCall<LoginResponse>('/api/auth/login', 'POST', credentials);
    return response;
};

interface GoogleLoginResponse {
    token: string;
    email: string;
    _id: string;
}

export const googleLogin = async (tokenId: string): Promise<GoogleLoginResponse> => {
    const response = await apiCall<GoogleLoginResponse>('/api/auth/google/', 'GET');
    return response;
};


