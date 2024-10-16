import { addToCart, CartItem } from "@/ultils/api/cart";
import BasicButton from "../button/basic-button";
import Link from "next/link";
import { useRouter } from "next/router";
import { removeHttps } from "@/ultils/func/helper";
import Cookies from "js-cookie";

interface IProductCard {
  cost: string;
  name: string;
  shop: string;
  link: string;
  src: string;
  commission: string;
}

const ProductCard = (props: IProductCard) => {
  const token = Cookies.get("authToken");

  const handleAddToCart = async () => {
    const data: CartItem = {
      productId: removeHttps(props.link),
      price: props.cost,
      productName: props.name,
      productLink: props.link,
      quantity: 1,
      cashbackPercentage: Number(props.commission),
    };
    const res = await addToCart(data, token!);
  };

  return (
    <div className="w-[45%] sm:w-[200px] sm:max-w-[250px] md:h-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full">
      <img
        className="rounded-t-lg object-cover h-[200px] mb-2 mx-auto"
        src={props.src}
        alt="product image"
      />
      <div className="px-5 pb-5">
        <div>
          <div>
            <Link
              href={`/product/${props.link}` || "#"}
              className="block h-[120px] font-semibold tracking-tight text-gray-900 dark:text-white overflow-hidden hover:underline"
            >
              {props.name}
            </Link>
          </div>
          <div className=" font-sm h-[30px] overflow-hidden block text-primary-600 hover:underline dark:text-primary-500 mb-[20px]">
            {props.shop}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center mb-[20px] md:flex-row">
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            {props.commission}%
          </span>
          <span className="text-sm h-[40px] font-bold text-gray-900 dark:text-white">
            {props.cost}Đ
          </span>
        </div>
        <div className="flex items-center justify-between flex-col md:flex-row gap-2 md:gap-4">
          <BasicButton variant="success" text="Lưu" onClick={handleAddToCart} />
          <a
            href={`/product/${props.link}` || "#"}
            className="w-full h-[40px] flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Mua
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
