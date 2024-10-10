"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LogoComponent from "@/components/logo";
import BasicButton from "@/components/button/basic-button";
import InputSection from "@/components/input/input";
import Link from "next/link";
import useAnimateNavigation from "@/hook/useAnimateNavigation";
import Cookies from "js-cookie";
import { login } from "@/ultils/api/auth";

const LoginPage = () => {
  const { isAnimating, handleNavigation } = useAnimateNavigation("/register");
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const {
        email: emailLogin,
        token,
        _id,
        name,
      } = await login({ email, password });
      if (token) {
        Cookies.set("authToken", token);
        Cookies.set("email", emailLogin);
        Cookies.set("id", _id);
        Cookies.set("user_name", name);
        router.push("/profile");
      }
    } catch (err) {
      setError("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async () => {
    try {
      router.push("http://localhost:5000/api/auth/google");
    } catch (error) {
      console.error("Google login failed:", error);
      setGoogleError("Đăng nhập bằng Google không thành công.");
    }
  };

  return (
    <>
      <section
        className={`bg-gray-50 dark:bg-gray-900 mt-[100px] mb-[100px] h-full min-h-screen ${
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
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <InputSection
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@gmail.com"
                  required={true}
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  showError={!!error}
                />
                <InputSection
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  required={true}
                  label="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <InputSection
                        type="checkbox"
                        name="remember"
                        id="remember"
                        required={true}
                        checked={true}
                        isHiddenLabel={true}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Tôi đồng ý với mọi điều khoản của QuickBack Shopping
                      </label>
                    </div>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 mt-5 block"
                >
                  Quên mật khẩu?
                </a>
                <BasicButton
                  text={loading ? "Đang đăng nhập..." : "Đăng nhập"}
                  type="submit"
                  disabled={loading}
                />
                <BasicButton
                  text="Đăng nhập bằng Google"
                  type="button"
                  variant="basic"
                  onClick={handleGoogleLoginSuccess}
                />

                <BasicButton
                  text="Đăng nhập bằng Telegram"
                  type="button"
                  variant="plain"
                  // Thêm logic đăng nhập Telegram sau nếu cần
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
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
