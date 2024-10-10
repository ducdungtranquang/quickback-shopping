/* eslint-disable @next/next/no-img-element */
import { Fragment, HTMLAttributes, useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import useAuth from "@/hook/useAuth";
import Link from "next/link";
import BaseModal from "@/components/modals/base-modal";
import { logout } from "@/ultils/func/api";
import { useRouter } from "next/navigation";
import AutoCompleteSearch from "@/components/search/autocomplete-search";
import { CATEGORIES, NAVIGATION_LIST } from "@/ultils/constant/constant";

interface IProps {
  isAuthenticated: boolean | null;
}

export default function NavBar({ isAuthenticated }: IProps) {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleConfirm = async () => {
    await logout();
    setIsModalOpen(false);
  };

  return (
    <div
      style={{ maxWidth: "992px" }}
      className="bg-white dark:bg-gray-800 fixed z-[99999] top-0 w-full"
    >
      {/* Mobile menu */}
      <Dialog
        open={open}
        onClose={setOpen}
        className="relative z-[999999] lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2 z-1">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {NAVIGATION_LIST.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {NAVIGATION_LIST.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-10 px-4 pb-8 pt-10"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                            <img
                              alt={item.imageAlt || "alt"}
                              src={item.imageSrc}
                              className="object-cover object-center"
                            />
                          </div>
                          <a
                            href={item.href}
                            className="mt-6 block font-medium text-gray-900"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 z-10"
                            />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1">
                            Mua ngay
                          </p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p
                          id={`${category.id}-${section.id}-heading-mobile`}
                          className="font-medium text-gray-900"
                        >
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <a
                                href={item.href}
                                className="-m-2 block p-2 text-gray-500"
                              >
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {NAVIGATION_LIST.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a
                    href={page.href}
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {isAuthenticated ? (
                <div
                  onClick={() => {
                    handleOpenModal();
                    setOpen(false);
                  }}
                  className="cursor-pointer font-medium text-gray-700 hover:text-gray-800"
                >
                  Đăng xuất
                </div>
              ) : (
                <>
                  <div className="flow-root">
                    <Link
                      href="login"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Đăng nhập
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link
                      href="/register"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Đăng ký
                    </Link>
                  </div>
                </>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <div className="w-full py-2 flex items-center text-center justify-center bg-primary-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Hoàn tiền không giới hạn với CashBack Shopping
        </div>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border dark:border-gray-700"
        >
          <div className="border-gray-200 py-3">
            <div className="flex h-16 items-center justify-between">
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Mở</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>

              <div
                className={`${
                  showSearch ? "nav-enter" : "nav-exit"
                } bg-transparent`}
              >
                <AutoCompleteSearch
                  categories={CATEGORIES}
                  styles={
                    {
                      top: 0,
                      width: "auto",
                    } as HTMLAttributes<HTMLDivElement>
                  }
                />
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="lg:ml-8 lg:block lg:self-stretch lg:block hidden ml-5">
                <div className="flex h-full space-x-8">
                  {NAVIGATION_LIST.categories.map((category, index) => (
                    <Popover key={category.name} className="flex">
                      <div className="relative flex">
                        <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800">
                          {category.name}
                        </PopoverButton>
                      </div>

                      <PopoverPanel
                        transition
                        className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        <div className="absolute inset-0 top-1/2 bg-white shadow" />

                        <div className="relative bg-white">
                          <div className="mx-auto max-w-7xl px-8">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                              <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                {category.featured.map((item) => (
                                  <div
                                    key={item.name}
                                    className="group relative text-base sm:text-sm"
                                  >
                                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                      <img
                                        alt={item.imageAlt}
                                        src={item.imageSrc}
                                        className="object-cover object-center"
                                      />
                                    </div>
                                    <a
                                      href={item.href}
                                      className="mt-6 block font-medium text-gray-900"
                                    >
                                      <span
                                        aria-hidden="true"
                                        className="absolute inset-0 z-10"
                                      />
                                      {item.name}
                                    </a>
                                    <p aria-hidden="true" className="mt-1">
                                      Mua ngay
                                    </p>
                                  </div>
                                ))}
                              </div>
                              <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                {category.sections.map((section) => (
                                  <div key={section.name}>
                                    <p
                                      id={`${section.name}-heading`}
                                      className="font-medium text-gray-900"
                                    >
                                      {section.name}
                                    </p>
                                    <ul
                                      role="list"
                                      aria-labelledby={`${section.name}-heading`}
                                      className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                    >
                                      {section.items.map((item) => (
                                        <li key={item.name} className="flex">
                                          <a
                                            href={item.href}
                                            className="hover:text-gray-800"
                                          >
                                            {item.name}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  ))}

                  {NAVIGATION_LIST.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </PopoverGroup>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {isAuthenticated ? (
                    <div
                      onClick={handleOpenModal}
                      className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Đăng xuất
                    </div>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        {isAuthenticated === null ? "" : "Đăng nhập"}
                      </Link>
                      <span
                        aria-hidden="true"
                        className="h-6 w-px bg-gray-200"
                      />
                      <Link
                        href="/register"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        {isAuthenticated === null ? "" : "Đăng ký"}
                      </Link>
                    </>
                  )}
                </div>

                {/* Search */}
                <div className="ml-4 flow-root lg:ml-6 ml-3">
                  <div
                    className="group -m-2 flex items-center p-2"
                    onClick={() => setShowSearch(!showSearch)}
                  >
                    <MagnifyingGlassIcon
                      aria-hidden="true"
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </div>
                </div>
                {/* User */}
                <div className="ml-4 flow-root lg:ml-6 ml-3">
                  <a href="#" className="group -m-2 flex items-center p-2">
                    <UserIcon
                      aria-hidden="true"
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </a>
                </div>
                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6 ml-3">
                  <div
                    onClick={() => {
                      router.push("/history/123?activeId=cart");
                    }}
                    className="group -m-2 flex items-center p-2"
                  >
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      0
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </div>
                </div>
              </div>
            </div>

            {isModalOpen ? (
              <BaseModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Đăng xuất"
                onConfirm={handleConfirm}
              >
                <p>Bạn có chắc chắn muốn đăng xuất</p>
              </BaseModal>
            ) : null}
          </div>
        </nav>
      </header>
    </div>
  );
}
