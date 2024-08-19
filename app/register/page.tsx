"use client";

import LogoComponent from "@/components/logo";
import BasicButton from "@/components/minnor/button/basic-button";
import InputSection from "@/components/minnor/input/input";
import useAnimateNavigation from "@/hook/useAnimateNavigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const { isAnimating, handleNavigation } = useAnimateNavigation("/login");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegis = () => {};

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
              Create an account
            </h1>
            <div className="space-y-4 md:space-y-6">
              <InputSection
                type="email"
                name="email"
                id="email"
                placeholder="name@gmail.com"
                required={true}
                label="Your email"
                value={email}
                onChange={(el) => setEmail(el.target.value)}
              />
              <InputSection
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                required={true}
                label="Password"
                value={password}
                onChange={(el) => setPassword(el.target.value)}
              />
              <InputSection
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                required={true}
                label="Confirm password"
                value={confirmPassword}
                onChange={(el) => setConfirmPassword(el.target.value)}
                showError={
                  confirmPassword !== password && confirmPassword.length > 0
                }
                contentError="Wrong password"
              />
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <InputSection
                    type="checkbox"
                    name="terms"
                    id="terms"
                    required={true}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <BasicButton
                text="Create an account"
                type="submit"
                onClick={handleRegis}
              />
              <BasicButton
                text="Sign in with Google"
                type="submit"
                variant="plain"
              />
              <BasicButton
                text="Sign in with Telegram"
                type="submit"
                variant="plain"
              />
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  onClick={handleNavigation}
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
