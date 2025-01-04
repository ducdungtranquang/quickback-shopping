"use client";
import Spinner from "@/components/spinner/spinner";
import { useCart } from "@/context/cartContext";
import { useToast } from "@/context/toastContext";
import useAuth from "@/hook/useAuth";
import Footer from "@/layout/app/footer";
import NavBar from "@/layout/app/navbar";
import { CartItem } from "@/ultils/api/cart";
import { getProductById, IProduct } from "@/ultils/api/product";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

/* eslint-disable @next/next/no-img-element */
export default function ProductPage() {
  const { isAuthenticated } = useAuth(false);
  const [product, setProduct] = useState<IProduct>();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { addToast } = useToast();
  const { addItem } = useCart();

  const handleAddToCart = async () => {
    const data: CartItem = {
      productId: id as string,
      price: product?.price as string,
      productName: product?.name as string,
      productLink: product?.link as string,
      quantity: 1,
      cashbackPercentage: Number(product?.commission),
    };

    try {
      await addItem(data);
    } catch (error) {
      addToast("Thêm sản phẩm vào giỏ hàng thất bại.", "error");
    }
  };

  useEffect(() => {
    const fetchProductById = async () => {
      setLoading(true);
      const data = await getProductById(id as string);
      setProduct(data);
      setLoading(false);
    };

    fetchProductById();
  }, [id]);

  return (
    <>
      {loading || !product ? (
        <div>
          <Spinner />
          <p className="text-center">Đang tải, chờ xíu nhé ...</p>
        </div>
      ) : (
        <div className="container">
          <NavBar isAuthenticated={isAuthenticated} />
          <div className="bg-gray-100 dark:bg-gray-800 py-8 mt-[100px] h-full min-h-screen p-4">
            <div className="max-w-full mx-auto px-4 md:px-2 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-2 sm:px-0">
                  <div className="md:h-[360px] h-[300px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                    <img
                      className="w-full h-full object-cover"
                      src={product?.img || "/img_no_img.jpg"}
                      alt="Product Image"
                    />
                  </div>
                  <div className="flex -mx-2 mb-4">
                    <div className="w-1/2 px-2">
                      <Link href={`${product?.link}`} target="_blank">
                        <button className="text-[16px] w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                          Mua
                        </button>
                      </Link>
                    </div>
                    <div className="w-1/2 px-2">
                      <button
                        onClick={handleAddToCart}
                        className="text-[16px] w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        Thêm giỏ hàng
                      </button>
                    </div>
                  </div>
                </div>
                <div className="md:flex-1 px-4">
                  <h2 className="text-md font-bold text-gray-800 dark:text-white mb-2">
                    Tên sản phẩm
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {product?.name}
                  </p>

                  <h2 className="text-md font-bold text-gray-800 dark:text-white mb-2">
                    Cửa hàng
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {product?.shop}
                  </p>

                  <h2 className="text-md font-bold text-gray-800 dark:text-white mb-2">
                    Danh mục
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Clothes - Test -Test
                  </p>
                  <div className="flex mb-4">
                    <div className="mr-4">
                      <span className="font-bold text-gray-700 dark:text-gray-300">
                        Giá:{" "}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {product?.price}Đ
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-700 dark:text-gray-300">
                        Hoàn:{" "}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {product?.commission}%
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      Lưu ý:
                    </span>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                      Các đơn vị bị hủy/đổi trả/hoàn đơn hoặc đặt tại Shopee
                      Livestream/Video hoặc thêm sản phẩm từ Livestream/Video sẽ
                      không được hoàn tiền
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                      Giao dịch sử dụng thẻ quà tặng hoặc Giftcard trừ trường
                      hợp có quy định được nêu trước đó.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                      Dán link cửa hàng (shop) không được áp dụng hoàn tiền ưu
                      đãi
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                      Tiền sẽ về ví bạn từ 5-7 ngày sau khi hoàn tất đơn hàng
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}
