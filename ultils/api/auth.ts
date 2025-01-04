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
  message: string;
  name: string;
}

interface RegisResponse {
  success: boolean;
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
): Promise<RegisResponse> => {
  const response = await apiCall<RegisResponse>(
    "/api/auth/register",
    "POST",
    credentials
  );
  return response;
};

export const verifyToken = async (
  token: string
): Promise<{ valid: boolean; role: number }> => {
  try {
    const response = await apiCall<{ valid: boolean; role: number }>(
      "/api/auth/verify-token",
      "POST",
      { token },
      token
    );
    return response;
  } catch (error) {
    return { valid: false, role: 0 };
  }
};

export const verifyAccount = async (token: string): Promise<LoginResponse> => {
  const response = await apiCall<LoginResponse>(
    "/api/auth/verify-account",
    "POST",
    { token }
  );
  return response;
};

export const resendVerify = async (email: string): Promise<LoginResponse> => {
  const response = await apiCall<LoginResponse>(
    "/api/auth/resend-verify",
    "POST",
    { email }
  );
  return response;
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

export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<any> => {
  try {
    const response = await apiCall<any>(
      "/api/user/reset-password",
      "POST",
      { newPassword, token },
      token
    );
    return response;
  } catch (error) {
    return false;
  }
};

export const forgotPassword = async (
  email: string
): Promise<any> => {
  try {
    const response = await apiCall<any>(
      "/api/user/forgot-password",
      "POST",
      { email },
    );
    return response;
  } catch (error) {
    return false;
  }
};
