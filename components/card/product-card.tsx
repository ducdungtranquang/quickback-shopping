import Image from "next/image";
import BasicButton from "../button/basic-button";
import { HTMLAttributes } from "react";

interface IProductCard {
  cost: number;
  name: string;
  shop: string;
  link: string;
  src: string;
  commission: number;
}

const ProductCard = (props: IProductCard) => {
  return (
    <div className="w-[45%] sm:w-[200px] sm:max-w-[250px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full">
      <a href={props.link}>
        <Image
          className="p-8 rounded-t-lg"
          src="/next.svg"
          alt="product image"
          width={100}
          height={100}
          layout="responsive"
        />
      </a>
      <div className="px-5 pb-5">
        <a href={props.link}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {props.name}
          </h5>
          <div className="font-semibold tracking-tight text-gray-900 dark:text-white mb-[20px]">
            {props.shop}
          </div>
        </a>
        <div className="flex items-center justify-between mb-[20px] flex-col md:flex-row">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {props.commission}%
          </span>
          <BasicButton
            styles={{ width: "90px" } as HTMLAttributes<HTMLButtonElement>}
            variant="success"
            text="Save"
          />
        </div>
        <div className="flex items-center justify-between flex-col md:flex-row">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {props.cost}$
          </span>
          <a
            href={props.link}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Buy now
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
