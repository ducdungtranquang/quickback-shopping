import BasicButton from "@/components/button/basic-button";
import ProgressCard from "@/components/card/progress-card";
import TreeSlider from "@/components/garden/tree-slider";
import { treeSlide } from "@/ultils/constant/constant";

export default function GardenLayout() {
  const treeList = [
    {
      title: "Làm quen bạn mới",
      des: "Lần đầu vào QuickBack Garden",
      src: "/Sunflower_05.svg",
    },
    {
      title: "Làm quen bạn mới",
      des: "Quà tặng bạn mới",
      src: "/Cactus_05.svg",
    },
    {
      title: "Khởi động",
      des: "Hoàn thành 1 lần mua sắm",
      src: "/Mushroom_05.svg",
    },
  ];
  return (
    <div className="relative">
      <div>
        <img
          alt="banner"
          src="/garden_banner.webp"
          className="w-full min-h-[72px] object-cover"
        />
      </div>
      <div className="absolute top-[56px] sm:top-[140px] left-[50%] z-5 flex justify-center items-center w-[90%] translate-x-[-50%] px-2 py-5 bg-white rounded-lg flex-col">
        <div className="w-[200px] h-[200px] bg-[#f2faf3] rounded-full border-4 border-green-100 flex justify-center items-center">
          <img
            alt="tree"
            src="/Lotus_03.svg"
            className="w-[120px] h-[120px] "
          />
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm md:text-medium font-semibold">
            Bạn còn phải tưới 3 lần nước nữa
          </p>
          <div className="mt-4">
            <BasicButton variant="success" text="Tưới ngay" />
          </div>
        </div>

        <hr className="h-px my-8 bg-green-200 border-0 dark:bg-green-700 w-full h-[3px]" />

        <div className="w-full border-2 border-green-100 rounded-lg">
          <div className="flex gap-2 items-center w-full bg-[#ebf4d5]">
            <img src="/Apple_03.svg" alt="nuts" className="w-[42px] h-[42px]" />
            <h2 className="font-bold text-medium">Hạt giống</h2>
          </div>

          <div className="mt-4">
            {treeList?.map((item, i) => (
              <ProgressCard
                key={i}
                title={item.title}
                des={item.des}
                src={item.src}
              />
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h2 className="font-semibold tracking-tight text-gray-900 dark:text-white">
            Những hoạt động khác
          </h2>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
