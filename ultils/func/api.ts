import Cookies from "js-cookie";
import { URL_API } from "../constant/constant";

export async function apiCall<T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: any,
    token?: string
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
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export const logout = () => {
    Cookies.remove("authToken");
    Cookies.remove("id");
    Cookies.remove("email");
    window.open('/login')
}
