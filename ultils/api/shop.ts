import { apiCall } from "../func/api";

export interface IShopArr {
  shop: string;
  firstProductImg: string;
  firstProductCommission: number;
}

export interface IShops {
  shops: IShopArr[];
  currentPage: number;
  totalPages: number;
  totalShops: number;
}

export interface IShopQuery {
  sheetName?: string;
  page?: number;
  limit?: number;
  searchTerm?: string;
  // sort?: "price-desc" | "price-asc" | "sales" | "newest";
}

export const getShops = async (
  query: IShopQuery,
  signal?: AbortSignal
): Promise<IShops> => {
  const params = new URLSearchParams();

  if (query.sheetName) params.append("sheetName", query.sheetName);
  if (query.page) params.append("page", query.page.toString());
  if (query.limit) params.append("limit", query.limit.toString());
  if (query.searchTerm) params.append("searchTerm", query.searchTerm);

  return apiCall<IShops>(
    `/api/shop?${params.toString()}`,
    "GET",
    undefined,
    undefined,
    signal
  );
};
