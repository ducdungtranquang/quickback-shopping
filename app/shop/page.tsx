"use client";
import ProductCard from "@/components/card/product-card";
import ShopCard from "@/components/card/shop-card";
import Slider from "@/components/slider/slider";
import Spinner from "@/components/spinner/spinner";
import useAuth from "@/hook/useAuth";
import NavBar from "@/layout/app/navbar";
import { getShops, IShopArr, IShopQuery, IShops } from "@/ultils/api/shop";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function ShopPage() {
  const { isAuthenticated } = useAuth(false);
  const [shop, setShop] = useState<IShopArr[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const fetchMoreProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const query: IShopQuery = {
      page,
      limit: 20,
      searchTerm: search,
    };

    const data = await getShops(query);
    if (!data?.shops || data?.shops?.length < 20) {
      setHasMore(false);
    } else {
      setShop((prev) => [...prev, ...data.shops]);
      setPage((prevPage) => prevPage + 1);
    }
    setLoading(false);
  }, [loading, hasMore, page, search]);

  useEffect(() => {
    setPage(1);
    setShop([]);
    setHasMore(true);
    fetchMoreProducts();
  }, [search]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !loading) {
          await fetchMoreProducts();
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
  }, [fetchMoreProducts, loading]);

  const updateURLParams = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };

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
    <div className="container">
      <NavBar isAuthenticated={isAuthenticated} />
      <section className="py-6 px-4 bg-gray-100 h-full min-h-screen overflow-hidden overflow-y-scroll mt-[100px]">
        <div className="mx-auto mt[20px]">
          <Slider slides={slides} loop={true} autoPlay={true} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-black sm:text-normal md:text-2xl mt-5">
            Ưu đãi Hoàn Tiền nổi bật
          </h2>
          <div className="flex overflow-x-auto custom-scrollbar pb-[5px] gap-4">
            {shop?.map((item, i) => {
              {
                if (i < 5) {
                  return (
                    <ShopCard
                      key={i}
                      name={item.shop}
                      src={item.firstProductImg}
                      commission={item.firstProductCommission}
                      link={`/product?shopName=${item.shop}`}
                      buttonText="Xem"
                    />
                  );
                }
              }
            })}
          </div>
        </div>

        {/* Shop Grid */}
        <h2 className="text-xl font-bold text-black sm:text-normal md:text-2xl mt-8">
            Danh sách cửa hàng
          </h2>
        <div className="flex flex-wrap justify-around sm:justify-left gap-2 sm:gap-4">
          {!loading && shop?.length ? (
            shop?.map((item, i) => (
              <ShopCard
                key={i}
                name={item.shop}
                src={item.firstProductImg}
                commission={item.firstProductCommission}
                link={`/product?shopName=${item.shop}`}
              />
            ))
          ) : (
            <div className="mx-auto">
              <Spinner />
              <p className="text-center">Đang tải ...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
