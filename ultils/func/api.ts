import Cookies from "js-cookie";
import { URL_API } from "../constant/constant";
import { logoutAccount } from "../api/auth";

export async function apiCall<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: any,
  token?: string,
  signal?: AbortSignal
): Promise<T | any> {
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
      // throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    }

    return response.json();
  } catch (error) {
    console.log(error);
    return undefined
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
