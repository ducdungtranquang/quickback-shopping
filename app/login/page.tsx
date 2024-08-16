"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LogoComponent from "@/components/logo";
import BasicButton from "@/components/minnor/button/basic-button";
import InputSection from "@/components/minnor/input/input";
import Link from "next/link";
import useAnimateNavigation from "@/hook/useAnimateNavigation";

const LoginPage = () => {
  const { isAnimating, handleNavigation } = useAnimateNavigation("/register");

  return (
    <section
      className={`bg-gray-50 dark:bg-gray-900 h-screen ${
        isAnimating ? "page-exit-active" : "page-enter-active"
      }`}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <LogoComponent />
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <InputSection
                type="email"
                name="email"
                id="email"
                placeholder="name@gmail.com"
                required={true}
                label="Your email"
                showError={true}
              />
              <InputSection
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                required={true}
                label="Password"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required={true}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <BasicButton text="Sign in" type="submit" />
              <BasicButton
                text="Sign in with Google"
                type="submit"
                variant="basic"
              />
              <BasicButton
                text="Sign in with Telegram"
                type="submit"
                variant="plain"
              />
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href="/register"
                  onClick={handleNavigation}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
