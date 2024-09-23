"use client";

import Gallery from "@/components/gallery/gallery";
import AutoCompleteSearch from "@/components/search/autocomplete-search";
import Slider from "@/components/slider/slider";
import NavBar from "@/layout/navbar";
import { CATEGORIES } from "@/ultils/constant/constant";
import { HTMLAttributes } from "react";

export default function Home() {
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
    <div
      className="bg-red-500 h-[200px] sm:h-[400px] flex items-center justify-center text-white"
      key={3}
    >
      Slide 4
    </div>,
  ];
  return (
    <div>
      <NavBar />
      <section className="py-6 px-4 bg-gray-100 h-full min-h-screen overflow-hidden overflow-y-scroll mt-[100px]">
        <AutoCompleteSearch
          categories={CATEGORIES}
          styles={
            {
              top: 0,
              width: "auto",
            } as HTMLAttributes<HTMLDivElement>
          }
        />
        <div className="container mx-auto w-full">
          <Slider slides={slides} loop={true} autoPlay={true} />
        </div>

        <h2 className="text-xl font-bold text-black sm:text-xl md:text-2xl mt-[20px] text-center p-2">
          Sản phẩm nổi bật
        </h2>
        <Gallery />
      </section>
    </div>
  );
}
