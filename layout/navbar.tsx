import React, { useState } from "react";
import Image from "next/image";
import BasicButton from "@/components/button/basic-button";

const Navbar: React.FC = () => {
  const [isCartDropdownOpen, setCartDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleCartDropdown = () => {
    setCartDropdownOpen(!isCartDropdownOpen);
    setMenuOpen(false);
    setUserDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!isUserDropdownOpen);
    setCartDropdownOpen(false);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
    setUserDropdownOpen(false);
    setCartDropdownOpen(false);
  };

  return (
    <nav
      style={{ maxWidth: "992px", zIndex: 10000 }}
      className="bg-white dark:bg-gray-800 antialiased w-full fixed top-0 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8 relative">
            <div className="shrink-0">
              <a href="#" title="Trang Chủ">
                <Image
                  className="block w-auto h-8 dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/logo-full.svg"
                  alt="Logo"
                  width={150}
                  height={40}
                />
                <Image
                  className="hidden w-auto h-8 dark:block"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/logo-full-dark.svg"
                  alt="Logo"
                  width={150}
                  height={40}
                />
              </a>
            </div>

            <ul
              className={`hidden md:flex items-center gap-6 py-3 sm:justify-center top-full left-0 w-full bg-white dark:bg-gray-800 lg:static lg:w-auto lg:bg-transparent transition-all duration-300 ease-in-out`}
            >
              {[
                "Trang Chủ",
                "Bán Chạy",
                "Gợi Ý Quà Tặng",
                "Khuyến Mãi Hôm Nay",
                "Bán Hàng",
              ].map((item) => (
                <li key={item} className="px-4">
                  <a
                    href="#"
                    className="block text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500 py-2 lg:py-0"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center lg:space-x-2">
            <button
              onClick={toggleCartDropdown}
              className="inline-flex items-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium text-gray-900 dark:text-white"
            >
              <span className="sr-only">Giỏ Hàng</span>
              <svg
                className="w-5 h-5 lg:mr-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                />
              </svg>
              <span className="hidden sm:flex">Giỏ Hàng Của Tôi</span>
              <svg
                className="hidden sm:flex w-4 h-4 text-gray-900 dark:text-white ml-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </button>

            <div
              style={{ top: "72px", maxHeight: "290px" }}
              className={`${
                isCartDropdownOpen ? "nav-enter" : "nav-exit"
              } absolute z-10 mx-auto max-w-xl w-sm space-y-4 overflow-hidden rounded-lg bg-white p-4 antialiased shadow-lg dark:bg-gray-800 overflow-y-scroll border border-gray-200`}
            >
              <BasicButton text="Tất cả" variant="plain" />
              {[
                { name: "Apple iPhone 15", price: 599, qty: 1 },
                { name: "Apple iPad Air", price: 499, qty: 1 },
                { name: "Sony Playstation 5", price: 799, qty: 1 },
                { name: "Sony Playstation 5", price: 799, qty: 1 },
                { name: "Sony Playstation 5", price: 799, qty: 1 },
              ].map((item, index) => (
                <div key={index} className="grid grid-cols-2">
                  <div>
                    <a
                      href="#"
                      className="truncate text-sm font-semibold text-gray-900 dark:text-white hover:underline"
                    >
                      {item.name}
                    </a>
                    <p className="mt-0.5 truncate text-sm text-gray-500 dark:text-gray-400">
                      ${item.price}
                    </p>
                  </div>
                  <div className="flex items-center justify-end gap-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Số lượng: {item.qty}
                    </p>
                    <button className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600">
                      <span className="sr-only">Xóa</span>
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={toggleUserDropdown}
              className="inline-flex items-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium text-gray-900 dark:text-white"
            >
              <svg
                className="w-5 h-5 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <svg
                className="w-4 h-4 text-gray-900 dark:text-white ml-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </button>
            <button
              className="lg:hidden block p-2 text-gray-700 dark:text-gray-300"
              onClick={toggleMenu}
              aria-label="Mở Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <div
              style={{ top: "72px" }}
              className={`${
                isUserDropdownOpen ? "nav-enter" : "nav-exit"
              } absolute z-10 w-56 divide-y divide-gray-100 overflow-hidden overflow-y-auto rounded-lg bg-white antialiased shadow dark:divide-gray-600 dark:bg-gray-700`}
            >
              <ul className="p-2 text-start text-sm font-medium text-gray-900 dark:text-white">
                <li>
                  <a
                    href="#"
                    className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Tài Khoản Của Tôi
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Đơn Hàng Của Tôi
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={`lg:hidden ${isMenuOpen ? "nav-enter" : "nav-exit"}`}>
        <ul className="flex flex-col items-start gap-1 py-4 pt-0 px-8 bg-white dark:bg-gray-800">
          {[
            "Trang Chủ",
            "Bán Chạy",
            "Gợi Ý Quà Tặng",
            "Khuyến Mãi Hôm Nay",
            "Bán Hàng",
          ].map((item) => (
            <li key={item} className="w-full">
              <a
                href="#"
                className="block w-full text-sm p-4 font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500 hover:bg-gray-100"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
