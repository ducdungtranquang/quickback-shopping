import { apiCall } from "../func/api";

interface PurchaseHistoryItem {
  orderId: string;
  productName: string;
  quantity: number;
  price: number;
  orderDate: string;
}

interface GetPurchaseResponse {
  purchaseHistory: PurchaseHistoryItem[];
  total: number;
  pag: number;
}

export const getPurchase = async (
  token: string,
  page: number,
  signal?: AbortSignal
): Promise<GetPurchaseResponse> => {
  return apiCall<GetPurchaseResponse>(
    `/api/purchase-history?page=${page}`,
    "GET",
    undefined,
    token,
    signal
  );
};
