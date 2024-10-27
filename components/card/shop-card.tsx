/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

interface IShopCardProps {
  name: string;
  commission: number;
  src: string;
  link: string;
  buttonText?: string;
}

export default function ShopCard(props: IShopCardProps) {
  return (
    <div className="w-[100%] max-w-[400px] sm:w-[200px] sm:max-w-[250px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between">
      <Link href={props.link || "#"}>
        <img
          className="rounded-t-lg w-full max-h-[200px] object-cover"
          src={props.src || "/img_no_img.jpg"}
          alt=""
        />
      </Link>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="flex-1">
          <Link href={props.link || "#"}>
            <h5 className="mb-2 text-normal font-bold tracking-tight text-gray-900 dark:text-white">
              {props.name}
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Hoàn tiền đến {props.commission}%
          </p>
        </div>
        <Link
          href={props.link || "#"}
          className="inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {props.buttonText || "Xem chi tiết"}
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
