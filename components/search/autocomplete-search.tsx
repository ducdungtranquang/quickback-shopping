"use client";

import {
  ChangeEventHandler,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

interface IAutoComplete {
  categories?: string[];
  labelCategory?: string;
  label?: string;
  placeholder?: string;
  isHiddenCategory?: boolean;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  styles?: HTMLAttributes<HTMLDivElement>;
}

const AutoCompleteSearch = (props: IAutoComplete) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState(props.value || "");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  const handleSearch = (el: any) => {
    el.preventDefault();
    if (searchValue.trim()) {
      const currentUrl = new URL(window.location.href);
      const isOnProductPage = currentUrl.pathname === "/product";

      const params = new URLSearchParams(currentUrl.search);
      params.set("search", searchValue.trim());

      if (isOnProductPage) {
        router.replace(`/product?${params.toString()}`);
      } else {
        router.push(`/product?${params.toString()}`);
      }
    }
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchValue(event.target.value);
    props.onChange?.(event);
  };

  const handleClickCate = (val: string) => {
    const currentUrl = new URL(window.location.href);
    const isOnProductPage = currentUrl.pathname === "/product";

    const params = new URLSearchParams(currentUrl.search);
    params.set("sheetName", val.trim());

    if (isOnProductPage) {
      router.replace(`/product?${params.toString()}`);
    } else {
      router.push(`/product?${params.toString()}`);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={`py-2 px-2`} style={props.styles}>
      <form onSubmit={handleSearch} className="flex relative">
        {!props.isHiddenCategory && (
          <>
            <button
              ref={buttonRef}
              id="dropdown-button"
              className="flex-shrink-0 z-1 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              type="submit"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Danh mục{" "}
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {showDropdown && (
              <div
                id="dropdown"
                className="w-full absolute top-[50px] z-[1000] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                ref={dropdownRef}
              >
                <ul
                  className="py-3 px-1 text-sm text-gray-700 dark:text-gray-200 flex gap-1 justify-start flex-wrap nav-enter"
                  aria-labelledby="dropdown-button"
                >
                  {props.categories?.map((item, i) => (
                    <li
                      className="cursor-pointer underline"
                      key={i}
                      onClick={() => {
                        handleClickCate(item);
                      }}
                    >
                      <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        {item}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-2 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder={props.placeholder || "Tìm kiếm"}
            value={searchValue}
            onChange={handleInputChange}
          />
          <button
            onClick={handleSearch}
            type="submit"
            className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AutoCompleteSearch;
