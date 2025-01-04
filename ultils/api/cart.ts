import { apiCall } from "../func/api";

export interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number | string;
  productLink: string;
  cashbackPercentage: number;
  userId?: string;
}

export interface GetCartResponse {
  cartItems: CartItem[];
  total: number;
  pag: number;
}

export const getCart = async (
  token: string,
  page: number,
  signal?: AbortSignal
): Promise<GetCartResponse> => {
  return apiCall<GetCartResponse>(
    `/api/cart?page=${page}`,
    "GET",
    undefined,
    token,
    signal
  );
};

interface EditCartResponse {
  success: boolean;
  message?: string
}

export const addToCart = async (
  data: CartItem,
  token: string
): Promise<EditCartResponse> => {
  return apiCall<EditCartResponse>("/api/cart/add", "POST", data, token);
};

export const editCart = async (
  productId: string,
  quantity: number,
  token: string
): Promise<EditCartResponse> => {
  const data = { productId, quantity };
  return apiCall<EditCartResponse>("/api/cart", "PUT", data, token);
};
