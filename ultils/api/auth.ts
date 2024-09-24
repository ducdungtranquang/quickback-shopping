import { apiCall } from "../func/api";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  name: string;
  accountBank?: string;
}

interface LoginResponse {
  token: string;
  email: string;
  _id: string;
  name: string;
}

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await apiCall<LoginResponse>(
    "/api/auth/login",
    "POST",
    credentials
  );
  return response;
};

interface GoogleLoginResponse {
  token: string;
  email: string;
  _id: string;
}

export const googleLogin = async (
  tokenId: string
): Promise<GoogleLoginResponse> => {
  const response = await apiCall<GoogleLoginResponse>(
    "/api/auth/google/",
    "GET"
  );
  return response;
};

export const register = async (
  credentials: RegisterCredentials
): Promise<LoginResponse> => {
  const response = await apiCall<LoginResponse>(
    "/api/auth/register",
    "POST",
    credentials
  );
  return response;
};

export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    const response = await apiCall<{ valid: boolean }>(
      "/api/auth/verify-token",
      "POST",
      { token }
    );
    return response.valid;
  } catch (error) {
    return false;
  }
};

export const logoutAccount = async (token: string): Promise<boolean> => {
  try {
    const response = await apiCall<{ valid: boolean }>(
      "/api/auth/logout",
      "POST",
      { token }
    );
    return response.valid;
  } catch (error) {
    return false;
  }
};
