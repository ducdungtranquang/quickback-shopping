"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LogoComponent from "@/components/logo";
import BasicButton from "@/components/button/basic-button";
import InputSection from "@/components/input/input";
import Link from "next/link";
import useAnimateNavigation from "@/hook/useAnimateNavigation";

const LoginPage = () => {
  const { isAnimating, handleNavigation } = useAnimateNavigation("/register");

  return (
    <>
      <section
        className={`bg-gray-50 dark:bg-gray-900 mb-[100px] h-full min-h-screen ${
          isAnimating ? "page-exit-active" : "page-enter-active"
        }`}
      >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen mb-[50px] lg:mt-[50px] lg:py-0">
          <LogoComponent />
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Đăng nhập
              </h1>
              <div className="space-y-4 md:space-y-6">
                <InputSection
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@gmail.com"
                  required={true}
                  label="Email"
                  showError={true}
                />
                <InputSection
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  required={true}
                  label="Mật khẩu"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <InputSection
                        type="checkbox"
                        name="remember"
                        id="remember"
                        required={true}
                        isHiddenLabel={true}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Ghi nhớ tôi
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
                <BasicButton text="Đăng nhập" type="submit" />
                <BasicButton
                  text="Đăng nhập bằng Google"
                  type="submit"
                  variant="basic"
                />
                <BasicButton
                  text="Đăng nhập bằng Telegram"
                  type="submit"
                  variant="plain"
                />
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Chưa có tài khoản?{" "}
                  <Link
                    href="/register"
                    onClick={handleNavigation}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Đăng ký
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
