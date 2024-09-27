"use client";
import ProductCard from "@/components/card/product-card";
import ShopCard from "@/components/card/shop-card";
import Slider from "@/components/slider/slider";
import useAuth from "@/hook/useAuth";
import NavBar from "@/layout/navbar";

export default function ShopPage() {
  const { isAuthenticated } = useAuth(false);

  const test = Array(5).fill("test");
  const slides = [
    <div
      className="bg-blue-500 h-[200px] sm:h-[400px] flex items-center justify-center text-white"
      key={0}
    >
      Slide 1
    </div>,
    <div
      className="bg-green-500 h-[200px] sm:h-[400px] flex items-center justify-center text-white"
      key={1}
    >
      Slide 2
    </div>,
    <div
      className="bg-red-500 h-[200px] sm:h-[400px] flex items-center justify-center text-white"
      key={2}
    >
      Slide 3
    </div>,
  ];

  return (
    <>
      <NavBar isAuthenticated={isAuthenticated} />
      <section className="py-6 px-4 bg-gray-100 h-full min-h-screen overflow-hidden overflow-y-scroll mt-[100px]">
        <div className="mx-auto mt[20px]">
          <Slider slides={slides} loop={true} autoPlay={true} />
        </div>

        {/* Header */}
        <div className="mx-auto px-2 max-w-7xl mt-[50px]">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
            <h2 className="text-xl font-bold text-black sm:text-xl md:text-2xl">
              Cửa hàng
            </h2>
            <div className="flex overflow-x-auto custom-scrollbar pb-[5px]">
              <button className="flex-shrink-0 py-2 px-4 bg-red-500 text-white rounded">
                Phổ biến
              </button>
              <button className="flex-shrink-0 py-2 px-4 bg-gray-200 text-black rounded">
                Mới nhất
              </button>
              <button className="flex-shrink-0 py-2 px-4 bg-gray-200 text-black rounded">
                Bán chạy
              </button>
              <button className="flex-shrink-0 py-2 px-4 bg-gray-200 text-black rounded">
                Giá
              </button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-black sm:text-normal md:text-2xl mt-[20px]">
            Ưu đãi Hoàn Tiền nổi bật
          </h2>
          <div className="flex overflow-x-auto custom-scrollbar pb-[5px]">
            {test?.map((item, i) => (
              <ShopCard
                key={i}
                name={"Test Product"}
                src={"https://via.placeholder.com/150"}
                commission={0}
              />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-8 mb-[20px] px-2">
          <button className="py-2 px-4 bg-gray-200 text-black rounded">
            Trước
          </button>
          <div className="flex space-x-2 items-center ">
            <span>1/9</span>
            <button className="py-2 px-4 bg-gray-200 text-black rounded">
              Tiếp
            </button>
          </div>
        </div>

        {/* Shop Grid */}
        <div className="flex flex-wrap justify-around sm:justify-left gap-2 sm:gap-4">
          {test?.map((item, i) => (
            <ShopCard
              key={i}
              name={"Test Product"}
              src={"https://via.placeholder.com/150"}
              commission={0}
            />
          ))}
        </div>
      </section>
    </>
  );
}
