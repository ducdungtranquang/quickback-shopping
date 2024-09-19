"use client";
import ProductCard from "@/components/card/product-card";
import AutoCompleteSearch from "@/components/search/autocomplete-search";
import Slider from "@/components/slider/slider";
import NavBar from "@/layout/navbar";
import { CATEGORIES } from "@/ultils/constant/constant";
import { HTMLAttributes } from "react";

export default function ProductListPage() {
  const test = Array(20).fill("test");
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
      <NavBar />
      <section className="py-6 px-4 bg-gray-100 h-full min-h-screen overflow-hidden overflow-y-scroll mt-[72px]">
        <div className="container mx-auto">
          <Slider slides={slides} loop={true} autoPlay={true} />
        </div>
        <AutoCompleteSearch
          categories={CATEGORIES}
          styles={
            {
              top: 0,
              width: "auto",
              marginTop: "10px",
            } as HTMLAttributes<HTMLDivElement>
          }
        />

        {/* Header */}
        <div className="mx-auto px-2 max-w-7xl lg:px-8 mt-[50px]">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
            <h2 className="text-xl font-bold text-black sm:text-xl md:text-2xl">
              Cửa hàng
            </h2>
            <div className="flex overflow-x-auto custom-scrollbar pb-[5px]">
              <button className="flex-shrink-0 py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded">
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

        {/* Product Grid */}
        <div className="flex flex-wrap justify-around sm:justify-left gap-2 sm:gap-4">
          {test?.map((item, i) => (
            <ProductCard
              key={i}
              cost={0}
              name={"Test Product"}
              shop={"Test Shop"}
              link={"#"}
              src={"https://via.placeholder.com/150"}
              commission={0}
              shopLink={"/"}
            />
          ))}
        </div>
      </section>
    </>
  );
}
