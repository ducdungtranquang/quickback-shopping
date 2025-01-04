"use client";

import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  Suspense,
} from "react";
import ProductCard from "@/components/card/product-card";
import Slider from "@/components/slider/slider";
import NavBar from "@/layout/app/navbar";
import useAuth from "@/hook/useAuth";
import AccesstradeWidget from "@/components/acesstrade/accesstradeWidget";
import { getProduct, IProduct, IProductQuery } from "@/ultils/api/product";
import Spinner from "@/components/spinner/spinner";
import { useSearchParams } from "next/navigation";
import MediaMartWidget from "@/components/acesstrade/mediaMartWidget";
import Cookies from "js-cookie";
import BasicButton from "@/components/button/basic-button";

export default function ProductListPage() {
  const { isAuthenticated } = useAuth(false);
  const userId = Cookies.get("id");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const shopName = searchParams.get("shopName") || "";
  const sheetName = searchParams.get("sheetName") || "";
  const sort = searchParams.get("sort") || "sales";

  const fetchMoreProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const query: IProductQuery = {
      page,
      limit: 20,
      searchTerm: search,
      sort: sort as "price-desc" | "price-asc" | "sales" | "newest",
      shopName: shopName,
      sheetName,
    };

    const data = await getProduct(query);
    if (!data?.data) {
      setHasMore(false);
    }
    if (data?.data?.length < 20 && hasMore) {
      setHasMore(false);
      if (page === 1) {
        setProducts(data?.data || []);
      } else {
        setProducts((prev) => [...prev, ...(data?.data || [])]);
      }
    } else if (data?.data?.length >= 20) {
      if (page === 1) {
        setProducts(data?.data || []);
      } else {
        setProducts((prev) => [...prev, ...(data?.data || [])]);
      }
      setPage((prevPage) => prevPage + 1);
    }
    setLoading(false);
  }, [loading, hasMore, page, search, sort]);
  useEffect(() => {
    setPage(1);
    setProducts([]);
    setHasMore(true);
    fetchMoreProducts();
  }, [search, sort]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
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

  const handleSortChange = (sortOption: string) => {
    updateURLParams("sort", sortOption);
    setPage(1);
    setProducts([]);
    fetchMoreProducts();
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
    <Suspense fallback={loading}>
      <div className="container">
        <NavBar isAuthenticated={isAuthenticated} />
        <section className="py-6 px-4 bg-gray-100 h-full min-h-screen overflow-hidden overflow-y-scroll mt-[100px]">
          <div className="mx-auto mt-[20px]">
            <Slider slides={slides} loop={true} autoPlay={true} />
          </div>

          <div className="my-4">
            <AccesstradeWidget />
          </div>

          <div className="my-4">
            <MediaMartWidget />
          </div>

          <div className="flex overflow-x-auto custom-scrollbar pb-[5px] mb-[20px]">
            <button
              className={`flex-shrink-0 py-2 px-4 ${
                sort === "newest"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-black"
              } rounded`}
              onClick={() => handleSortChange("newest")}
            >
              Mới nhất
            </button>
            <button
              className={`flex-shrink-0 py-2 px-4 ${
                sort === "sales"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-black"
              } rounded`}
              onClick={() => handleSortChange("sales")}
            >
              Bán chạy
            </button>
            <button
              className={`flex-shrink-0 py-2 px-4 ${
                sort === "price-asc"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-black"
              } rounded`}
              onClick={() => handleSortChange("price-asc")}
            >
              Giá rẻ nhất
            </button>
            <button
              className={`flex-shrink-0 py-2 px-4 ${
                sort === "price-desc"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-black"
              } rounded`}
              onClick={() => handleSortChange("price-desc")}
            >
              Giá cao nhất
            </button>
          </div>

          <div className="max-w-[150px] pb-5">
            <BasicButton
              text="Reset bộ lọc"
              variant="plain"
              onClick={async () => {
                window.history.replaceState(
                  null,
                  "",
                  window.location.pathname.toString()
                );
                setHasMore(true);
                await fetchMoreProducts();
              }}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 sm:justify-left gap-2 sm:gap-4 mt-2">
            {products && products?.length > 0 ? (
              products?.map((item, i) => (
                <ProductCard
                  key={i}
                  cost={item.price}
                  name={item.name}
                  shop={item.shop}
                  link={`${item.link}?utm_source=${userId}`}
                  src={item.img || "/img_no_img.jpg"}
                  commission={item.commission}
                />
              ))
            ) : (
              <div className="flex justify-center items-center flex-col mt-4">
                {!loading && (
                  <p className="p-2 text-black">Không tìm thấy sản phẩm</p>
                )}
              </div>
            )}
          </div>

          {loading && (
            <div className="flex justify-center items-center flex-col mt-4">
              <Spinner />
              <p className="p-2 text-black">Đang tải sản phẩm...</p>
            </div>
          )}

          <div ref={observerRef} className="h-10"></div>
        </section>
      </div>
    </Suspense>
  );
}
