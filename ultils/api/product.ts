import { apiCall } from "../func/api";

export interface IProduct {
  name: string;
  price: string;
  link: string;
  commission: string;
  sales: string;
  shop: string;
  img: string;
}

interface IProductList {
  data: IProduct[];
  currentPage: number;
}

export interface IProductQuery {
  sheetName?: string;
  page?: number;
  limit?: number;
  searchTerm?: string;
  shopName?: string;
  sort?: "price-desc" | "price-asc" | "sales" | "newest";
}

export const getProduct = async (
  query: IProductQuery,
  signal?: AbortSignal
): Promise<IProductList> => {
  const params = new URLSearchParams();

  if (query.sheetName) params.append("sheetName", query.sheetName);
  if (query.page) params.append("page", query.page.toString());
  if (query.limit) params.append("limit", query.limit.toString());
  if (query.searchTerm) params.append("searchTerm", query.searchTerm);
  if (query.shopName) params.append("shopName", query.shopName);
  if (query.sort) params.append("sort", query.sort);

  return apiCall<IProductList>(
    `/api/product?${params.toString()}`,
    "GET",
    undefined,
    undefined,
    signal
  );
};

export const getProductById = async (
  id: string,
  signal?: AbortSignal
): Promise<IProduct> => {
  return apiCall<IProduct>(
    `/api/product/${id}`,
    "GET",
    undefined,
    undefined,
    signal
  );
};

export const getCount = async (
  token: string,
  signal?: AbortSignal
): Promise<any> => {
  return apiCall<any>(`/api/product/admin-product`, "GET", undefined, token);
};

export const addProduct = async (
  token: string,
  data?: any,
): Promise<any> => {
  return apiCall<any>(`/api/product/admin-add-product`, "POST", data, token);
};

export const updateProduct = async (
  token: string,
  id: string,
  data: any,
): Promise<any> => {
  return apiCall<any>(`/api/product/admin-edit-product/${id}`, "PUT", data, token);
};

export const delProduct = async (
  token: string,
  id: string,
  signal?: AbortSignal
): Promise<any> => {
  return apiCall<any>(`/api/product/admin-del-product/${id}`, "DELETE", undefined, token);
};
