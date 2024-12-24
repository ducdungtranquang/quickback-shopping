import { useState, useEffect, useCallback, useMemo } from "react";
import BasicButton from "@/components/button/basic-button";
import ProgressCard from "@/components/card/progress-card";
import BaseModal from "@/components/modals/base-modal";
import Slider from "@/components/slider/slider";
import Cookies from "js-cookie";
import {
  getGardenStatus,
  harvestTree,
  IGardenStatus,
  plantTree,
  waterTree,
} from "@/ultils/api/garden";
import Spinner from "@/components/spinner/spinner";
import Toast from "@/components/toast/toast";

interface TreeItem {
  id: number;
  title: string;
  description: string;
  type: string;
  src: string;
  bgColor: string;
}

const treeList: TreeItem[] = [
  {
    id: 1,
    title: "Làm quen bạn mới",
    description: "Lần đầu vào QuickBack Garden",
    src: "/Sunflower_05.svg",
    bgColor: "bg-green-500",
    type: "Sunflower",
  },
  {
    id: 2,
    title: "Quà tặng bạn mới",
    description: "Quà tặng bạn mới",
    src: "/Cactus_05.svg",
    bgColor: "bg-red-500",
    type: "Cactus",
  },
  {
    id: 3,
    title: "Khởi động",
    description: "Hoàn thành 1 lần mua sắm",
    src: "/Mushroom_05.svg",
    bgColor: "bg-orange-500",
    type: "Mushroom",
  },
  {
    id: 4,
    title: "Cây sen",
    description: "Một loài hoa đẹp",
    src: "/Lotus_05.svg",
    bgColor: "bg-blue-500",
    type: "Lotus",
  },
];

const canWaterTree = (lastWateredAt: string, plantAt = "1/1/1"): boolean => {
  const lastWateredTime = new Date(lastWateredAt).getTime();
  const plantAtTime = new Date(plantAt).getTime();
  const currentTime = Date.now();
  return (
    (currentTime - lastWateredTime) / (1000 * 60 * 60) >= 24 ||
    plantAtTime - lastWateredTime === 0
  );
};

export default function GardenLayout({
  isAuthenticated,
}: {
  isAuthenticated: boolean | null;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTree, setSelectedTree] = useState<string>("");
  const [treeStatus, setTreeStatus] = useState<IGardenStatus>({
    _id: "",
    type: "",
    status: "",
    waterings: 0,
    lastWateredAt: 0 as any,
    plantedAt: 0 as any,
  });
  const [userMoney, setUserCoin] = useState(0);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("authToken");
  const [isToastHidden, setIsToastHidden] = useState(true);

  const showToast = () => {
    setIsToastHidden(false);
  };

  const hideToast = () => {
    setIsToastHidden(true);
  };

  const handlePlantTree = useCallback(async () => {
    if (!token || !selectedTree) return;
    try {
      setLoading(true);
      await plantTree(token, selectedTree);
      setIsModalOpen(false);
      const { tree, userCoin } = await getGardenStatus(token);
      setUserCoin(userCoin);
      setTreeStatus(tree);
    } catch (error) {
      console.error("Error planting tree:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedTree, token]);

  const handleWaterTree = useCallback(async () => {
    try {
      const canWater = canWaterTree(
        treeStatus?.lastWateredAt?.toString(),
        treeStatus?.plantedAt?.toString()
      );
      if (treeStatus?.status === "alive" && treeStatus?.waterings < 7) {
        setLoading(true);
        const res = await waterTree(token!, treeStatus._id, !canWater);
        if (!res?.status) {
          showToast();
        }
        setLoading(false);
      } else if (treeStatus?.status === "finish") {
        await harvestTree(token!);
      } else {
        setIsModalOpen(true);
      }

      const { tree, userCoin } = await getGardenStatus(token!);
      setUserCoin(userCoin);
      setTreeStatus(tree);
    } catch (error) {
      console.error("Error watering tree:", error);
    }
  }, [treeStatus, token]);

  useEffect(() => {
    const fetchTreeStatus = async () => {
      if (isAuthenticated && token) {
        try {
          const { tree, userCoin } = await getGardenStatus(token);
          setTreeStatus(tree);
          setUserCoin(userCoin);
        } catch (error) {
          console.error("Error fetching tree status:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchTreeStatus();
  }, [isAuthenticated, token]);

  const slides = useMemo(
    () =>
      treeList.map((tree) => (
        <div
          key={tree.id}
          onClick={() => setSelectedTree(tree.type)}
          className={`${
            tree.bgColor
          } h-[200px] sm:h-[400px] cursor-pointer flex items-center justify-center relative text-white ${
            selectedTree === tree.type ? "bg-gray-600" : ""
          }`}
        >
          <img
            className={`${selectedTree === tree.type ? "opacity-40" : ""}`}
            src={tree.src}
            alt="tree"
          />
          {selectedTree === tree.type && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg sm:text-2xl font-bold">Chọn</span>
            </div>
          )}
        </div>
      )),
    [selectedTree]
  );

  return (
    <div className="relative">
      {!isToastHidden && (
        <Toast
          type="error"
          content="Tưới cây thất bại!"
          isHidden={isToastHidden}
          onClose={hideToast}
        />
      )}
      <BaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Chọn cây"
        onConfirm={handlePlantTree}
      >
        <Slider
          slides={slides}
          loop
          autoPlay
          slidesPerView={2}
          spaceBetween={10}
        />
      </BaseModal>

      <img
        alt="banner"
        src="/garden_banner.webp"
        className="w-full min-h-[72px] object-cover"
      />

      <div className="absolute top-[56px] sm:top-[140px] left-1/2 transform -translate-x-1/2 z-5 flex flex-col items-center w-[90%] px-2 py-5 bg-white rounded-lg">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="w-[200px] h-[200px] bg-[#f2faf3] rounded-full border-4 border-green-100 flex justify-center items-center">
              <img
                alt="tree"
                src="/Lotus_03.svg"
                className="w-[120px] h-[120px]"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm md:text-medium font-semibold">
                {treeStatus?.status === "alive" && treeStatus.waterings < 7
                  ? `Bạn còn phải tưới ${7 - treeStatus.waterings} lần nước nữa`
                  : treeStatus?.status === "finish"
                  ? "Thu hoạch ngay!"
                  : "Rất tiếc, vui lòng trồng cây mới"}
              </p>
              <BasicButton
                variant="success"
                text={
                  treeStatus?.status === "alive" && treeStatus.waterings < 7
                    ? canWaterTree(treeStatus?.lastWateredAt?.toString())
                      ? "Tưới ngay"
                      : `Tiêu 100Đ để tưới cây ${
                          userMoney >= 100 ? "" : "(Không đủ tiền)"
                        }`
                    : treeStatus?.status === "finish"
                    ? "Thu hoạch ngay"
                    : "Chọn cây mới"
                }
                disabled={
                  treeStatus?.status === "alive" &&
                  treeStatus.waterings < 7 &&
                  !canWaterTree(treeStatus?.lastWateredAt?.toString()) &&
                  userMoney < 100
                }
                onClick={handleWaterTree}
              />
            </div>
          </>
        )}

        <hr className="my-8 w-full h-[3px] bg-green-200 border-0 dark:bg-green-700" />

        <div className="w-full border-2 border-green-100 rounded-lg">
          <div className="flex items-center gap-2 w-full bg-[#ebf4d5] p-2">
            <img src="/Apple_03.svg" alt="nuts" className="w-[42px] h-[42px]" />
            <h2 className="font-bold text-medium">Hạt giống</h2>
          </div>

          <div className="mt-4">
            {treeList.map((item) => (
              <ProgressCard
                key={item.id}
                title={item.title}
                des={item.description}
                src={item.src}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
