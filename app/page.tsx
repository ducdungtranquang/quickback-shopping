"use client";

import BasicButton from "@/components/button/basic-button";
import Gallery from "@/components/gallery/gallery";
import GridGallery from "@/components/gallery/grid-gallery";
import Hero from "@/components/hero/hero";
import Slider from "@/components/slider/slider";
import useAuth from "@/hook/useAuth";
import Footer from "@/layout/app/footer";
import NavBar from "@/layout/app/navbar";
import Link from "next/link";

export default function Home() {
  const { isAuthenticated } = useAuth(false);
  const slides = [
    <div
      className="bg-blue-500 h-[200px] sm:h-[400px] flex items-center justify-center text-white"
      key={0}
    >
      <img className="h-full object-fit w-full" src="/home_banner.jpg" alt="" />
    </div>,
    <div
      className="bg-green-500 h-[200px] sm:h-[400px] flex items-center justify-center text-white"
      key={1}
    >
      <img
        className="h-full object-fit w-full"
        src="/home_banner1.jpg"
        alt=""
      />
    </div>,
    <div
      className="bg-red-500 h-[200px] sm:h-[400px] flex items-center justify-center text-white"
      key={2}
    >
      <img className="h-full object-fit w-full" src="/my_pham.jpg" alt="" />
    </div>,
    <div
      className="bg-red-500 h-[200px] sm:h-[400px] flex items-center justify-center text-white"
      key={3}
    >
      <img className="h-full object-fit w-full" src="/slider_4.jpg" alt="" />
    </div>,
  ];
  return (
    <div className="container">
      <NavBar isAuthenticated={isAuthenticated} />
      <section className="py-6 px-4 bg-gray-100 h-full min-h-screen overflow-hidden overflow-y-scroll mt-[100px]">
        <div className="mt-[10px]">
          <Hero />
        </div>
        <div className="mx-auto w-full mt-[20px]">
          <Slider slides={slides} loop={true} autoPlay={true} />
        </div>

        <h2 className="text-xl font-bold text-black sm:text-xl md:text-2xl mt-[20px] md:mt-[40px] text-center py-4">
          Thương hiệu nổi bật
        </h2>
        <Gallery />
        <Link href={"/shop"} className="pt-4 block max-w-[400px] mx-auto">
          <BasicButton text="Xem thêm" variant="basic"/>
        </Link>

        <h2 className="text-xl font-bold text-black sm:text-xl md:text-2xl mt-[20px] md:mt-[40px] text-center py-4">
          Sản phẩm nổi bật
        </h2>
        <GridGallery />
        <Link href={"/shop"} className="pt-4 block max-w-[400px] mx-auto">
          <BasicButton text="Xem thêm" variant="basic" />
        </Link>
      </section>

      <Footer />
    </div>
  );
}
