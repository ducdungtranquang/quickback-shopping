"use client";
import React, { useState, useEffect, useRef } from "react";
import ProductCard from "@/components/card/product-card";
import Slider from "@/components/slider/slider";
import NavBar from "@/layout/navbar";
import useAuth from "@/hook/useAuth";
import AccesstradeWidget from "@/components/acesstrade/accesstradeWidget";

export default function ProductListPage() {
  const { isAuthenticated } = useAuth(false);
  const [products, setProducts] = useState<string[]>(Array(20).fill("test"));
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchMoreProducts = async () => {
    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbw-iBmsC65UtJkuay1rXOei1k2o9BsTIJcfYnN372HgkwKjZhQI4Usih-JAWA61pDSm/exec"
    );
    const data = await res.json();
    console.log(data);
    setLoading(true);
    setTimeout(() => {
      setProducts((prevProducts) => [
        ...prevProducts,
        ...Array(20).fill(`test page ${page + 1}`),
      ]);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreProducts();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading]);

  const slides = [
    <div
      className="bg-blue-500 h-[200px] sm:h-[400px] flex items-center justify-center text-white"
      key={0}
    >
      <img
        className="h-full object-cover w-full"
        src="/home_banner.jpg"
        alt=""
      />
    </div>,
    <div
      className="bg-green-500 h-[200px] sm:h-[400px] flex items-center justify-center text-white"
      key={1}
    >
      <img className="h-full object-cover w-full" src="/giay_dep.jpg" alt="" />
    </div>,
    <div
      className="bg-red-500 h-[200px] sm:h-[400px] flex items-center justify-center text-white"
      key={2}
    >
      <img className="h-full object-cover w-full" src="/my_pham.jpg" alt="" />
    </div>,
    <div
      className="bg-red-500 h-[200px] sm:h-[400px] flex items-center justify-center text-white"
      key={3}
    >
      <img
        className="h-full object-cover w-full"
        src="/home_banner1.jpg"
        alt=""
      />
    </div>,
  ];

  return (
    <>
      <NavBar isAuthenticated={isAuthenticated} />
      <section className="py-6 px-4 bg-gray-100 h-full min-h-screen overflow-hidden overflow-y-scroll mt-[100px]">
        <div className="mx-auto mt-[20px]">
          <Slider slides={slides} loop={true} autoPlay={true} />
        </div>

        <div className="my-4">
          <AccesstradeWidget />
        </div>

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

        <div className="flex flex-wrap justify-around sm:justify-left gap-2 sm:gap-4">
          {products.map((item, i) => (
            <ProductCard
              key={i}
              cost={0}
              name={`Test Product ${i + 1}`}
              shop={`Test Shop`}
              link={"#"}
              src={"https://via.placeholder.com/150"}
              commission={0}
              shopLink={"/"}
            />
          ))}
        </div>

        {loading && (
          <div className="flex justify-center mt-4">
            <p>Đang tải thêm sản phẩm...</p>
          </div>
        )}

        <div ref={observerRef} className="h-10"></div>
      </section>
    </>
  );
}
