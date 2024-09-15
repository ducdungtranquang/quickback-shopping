import { apiCall } from "../func/api";

interface CartItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
}

interface GetCartResponse {
    cartItems: CartItem[];
    totalPrice: number;
}

export const getCart = async (token: string): Promise<GetCartResponse> => {
    return apiCall<GetCartResponse>('/api/cart', 'GET', undefined, token);
};

interface EditCartResponse {
    success: boolean;
}

export const editCart = async (productId: string, quantity: number, token: string): Promise<EditCartResponse> => {
    const data = { productId, quantity };
    return apiCall<EditCartResponse>('/api/cart', 'PUT', data, token);
};

