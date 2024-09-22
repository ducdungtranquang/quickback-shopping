import { apiCall } from "../func/api";

interface PurchaseHistoryItem {
  orderId: string;
  productName: string;
  quantity: number;
  price: number;
  orderDate: string;
}

interface GetPurchaseResponse {
  purchases: PurchaseHistoryItem[];
}

export const getPurchase = async (
  token: string,
  signal?: AbortSignal
): Promise<GetPurchaseResponse> => {
  return apiCall<GetPurchaseResponse>(
    "/api/purchase",
    "GET",
    undefined,
    token,
    signal
  );
};
