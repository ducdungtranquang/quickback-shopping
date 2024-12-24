import { apiCall } from "../func/api";

interface IWithdraw {
  userId: string;
  bank: string;
  transId: string;
  money: number;
  withdrawDate: Date;
  accountBank: number;
}

export const getWithdraw = async (
  token: string,
  signal?: AbortSignal
): Promise<IWithdraw> => {
  return apiCall<IWithdraw>("/api/withdraw", "GET", undefined, token, signal);
};

export const requestWithdraw = async (
  token: string,
  data: any,
  signal?: AbortSignal
): Promise<any> => {
  return apiCall<any>("/api/withdraw/request", "POST", data, token, signal);
};

export const verifyRequestWithdraw = async (
  token: string,
  data: any,
  signal?: AbortSignal
): Promise<any> => {
  return apiCall<any>("/api/withdraw/verify-withdraw", "POST", data, token, signal);
};
