import { apiCall } from "../func/api";

export interface IGardenStatus {
  _id: string;
  type: string;
  status: string;
  waterings: number;
  lastWateredAt: Date;
  plantedAt: Date;
}

interface IGardenStatusTree {
  tree: IGardenStatus;
  userCoin: number;
}

export interface IPlantTree {
  userId: string;
  treeType: string;
  plantedDate: Date;
}

export interface IWaterTree {
  userId: string;
  status: boolean;
  message: string;
}

interface IHarvestTree {
  userId: string;
  moneyEarned: number;
  success: boolean;
}

export const getGardenStatus = async (
  token: string,
  signal?: AbortSignal
): Promise<IGardenStatusTree> => {
  return apiCall<IGardenStatusTree>(
    "/api/garden",
    "GET",
    undefined,
    token,
    signal
  );
};

export const plantTree = async (
  token: string,
  treeType: string,
  signal?: AbortSignal
): Promise<IPlantTree> => {
  return apiCall<IPlantTree>(
    "/api/garden/plant",
    "POST",
    { treeType },
    token,
    signal
  );
};

export const waterTree = async (
  token: string,
  treeId: string,
  payForExtraWatering: boolean,
  signal?: AbortSignal
): Promise<IWaterTree> => {
  return apiCall<IWaterTree>(
    "/api/garden/water",
    "POST",
    { treeId, payForExtraWatering },
    token,
    signal
  );
};

export const harvestTree = async (
  token: string,
  signal?: AbortSignal
): Promise<IHarvestTree> => {
  return apiCall<IHarvestTree>(
    "/api/garden/harvest-tree",
    "POST",
    undefined,
    token,
    signal
  );
};
