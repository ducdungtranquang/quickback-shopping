import { useState } from "react";
import BasicButton from "@/components/button/basic-button";
import ProgressCard from "@/components/card/progress-card";
import BaseModal from "@/components/modals/base-modal";
import Slider from "@/components/slider/slider";

interface TreeItem {
  id: number;
  title: string;
  description: string;
  src: string;
  bgColor: string;
}

export default function GardenLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTree, setSelectedTree] = useState<number>(1);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleConfirm = () => {
    setIsModalOpen(false);
  };

  const treeList: TreeItem[] = [
    {
      id: 1,
      title: "Làm quen bạn mới",
      description: "Lần đầu vào QuickBack Garden",
      src: "/Sunflower_05.svg",
      bgColor: "bg-green-500",
    },
    {
      id: 2,
      title: "Quà tặng bạn mới",
      description: "Quà tặng bạn mới",
      src: "/Cactus_05.svg",
      bgColor: "bg-red-500",
    },
    {
      id: 3,
      title: "Khởi động",
      description: "Hoàn thành 1 lần mua sắm",
      src: "/Mushroom_05.svg",
      bgColor: "bg-orange-500",
    },
    {
      id: 4,
      title: "Cây sen",
      description: "Một loài hoa đẹp",
      src: "/Lotus_05.svg",
      bgColor: "bg-blue-500",
    },
  ];

  const slides = treeList.map((tree) => (
    <div
      key={tree.id}
      onClick={() => setSelectedTree(tree.id)}
      className={`${
        tree.bgColor
      } h-[200px] sm:h-[400px] cursor-pointer flex items-center justify-center relative text-white ${
        selectedTree === tree.id ? "bg-gray-600" : ""
      }`}
    >
      <img
        className={`${selectedTree === tree.id ? "opacity-40" : ""}`}
        src={tree.src}
        alt="tree"
      />
      {selectedTree === tree.id && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg sm:text-2xl font-bold">Chọn</span>
        </div>
      )}
    </div>
  ));

  return (
    <div className="relative">
      <BaseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Chọn cây"
        onConfirm={handleConfirm}
      >
        <Slider
          slides={slides}
          loop
          autoPlay
          slidesPerView={2}
          spaceBetween={10}
        />
      </BaseModal>

      <div>
        <img
          alt="banner"
          src="/garden_banner.webp"
          className="w-full min-h-[72px] object-cover"
        />
      </div>

      <div className="absolute top-[56px] sm:top-[140px] left-1/2 transform -translate-x-1/2 z-5 flex flex-col items-center w-[90%] px-2 py-5 bg-white rounded-lg">
        <div className="w-[200px] h-[200px] bg-[#f2faf3] rounded-full border-4 border-green-100 flex justify-center items-center">
          <img alt="tree" src="/Lotus_03.svg" className="w-[120px] h-[120px]" />
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm md:text-medium font-semibold">
            Bạn còn phải tưới 3 lần nước nữa
          </p>
          <div className="mt-4">
            <BasicButton
              variant="success"
              text="Tưới ngay"
              onClick={handleOpenModal}
            />
          </div>
        </div>

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

        <div className="mt-4 w-full">
          <h2 className="font-semibold tracking-tight text-gray-900 dark:text-white">
            Những hoạt động khác
          </h2>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[1, 2, 3].map((index) => (
              <div key={index}>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src={`https://flowbite.s3.amazonaws.com/docs/gallery/square/image-${index}.jpg`}
                  alt={`Hoạt động ${index}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
