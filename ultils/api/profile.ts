import { apiCall } from "../func/api";

interface EditProfileResponse {
  success: boolean;
}

export interface IProfile {}

interface MoneyByEvent {
  tree: number;
  wheel: number;
}

interface Tree {
  type: "Cactus" | "Sunflower" | "Lotus" | "Mushroom";
  plantedAt: string;
  lastWateredAt: string;
  waterings: number;
  status: "alive" | "dead";
  _id: string;
}

export interface IProfileResponse {
  moneyByEvent: MoneyByEvent;
  _id: string;
  name: string;
  email: string;
  googleId?: string;
  __v: number;
  password?: string;
  money: number;
  trees: Tree[];
  updatedAt: string;
  freeSpins: number;
  lastSpinDate: string;
  secretBoxesCollected: number;
  spinStartTime: string;
  spinToken: string;
  accountBank?: string;
  bankName?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  inviteCode?: string[];
  image?: string;
}

export const getProfile = async (token: string): Promise<IProfileResponse> => {
  return apiCall<IProfileResponse>("/api/user", "GET", undefined, token);
};

export const editProfile = async (
  data: any,
  token: string
): Promise<EditProfileResponse> => {
  return apiCall<EditProfileResponse>("/api/user/profile", "PUT", data, token);
};

interface ChangePasswordResponse {
  success: boolean;
}

export const changePassword = async (
  oldPassword: string,
  newPassword: string,
  token: string
): Promise<ChangePasswordResponse> => {
  const data = { oldPassword, newPassword };
  return apiCall<ChangePasswordResponse>(
    "/api/user/change-password",
    "PUT",
    data,
    token
  );
};
