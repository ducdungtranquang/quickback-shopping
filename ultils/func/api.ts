import Cookies from "js-cookie";
import { URL_API } from "../constant/constant";
import { logoutAccount } from "../api/auth";

export async function apiCall<T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: any,
    token?: string,
    signal?: AbortSignal
): Promise<T> {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${URL_API}${url}`, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
        signal,
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}


export const logout = async () => {
    const token = Cookies.get('authToken')
    await logoutAccount(token!)
    Cookies.remove("authToken");
    Cookies.remove("id");
    Cookies.remove("email");
    window.location.href = '/login'
}
