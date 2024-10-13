import Cookies from "js-cookie";
import { URL_API } from "../constant/constant";
import { logoutAccount } from "../api/auth";

export async function apiCall<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: any,
  token?: string,
  signal?: AbortSignal
): Promise<{ success: boolean; data?: T; message?: string }> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${URL_API}${url}`, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
      signal,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: `Error ${response.status}: ${
          errorData.message || response.statusText
        }`,
      };
    }

    return response.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong!",
    };
  }
}

export const logout = async () => {
  const token = Cookies.get("authToken");
  await logoutAccount(token!);
  Cookies.remove("authToken");
  Cookies.remove("id");
  Cookies.remove("email");
  window.location.href = "/login";
};
