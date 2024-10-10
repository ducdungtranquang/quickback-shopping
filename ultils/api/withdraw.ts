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
