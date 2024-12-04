"use client";

import LogoComponent from "@/components/logo";
import BasicButton from "@/components/button/basic-button";
import InputSection from "@/components/input/input";
import Link from "next/link";
import { useState } from "react";
import { register } from "@/ultils/api/auth";

const Account = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [googleError, setGoogleError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegis = async () => {
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setLoading(true);
    setError(null);
  };

  return (
    <div className="flex flex-col items-center sm:justify-start px-6 mx-auto">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Tạo tài khoản admin
          </h1>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="space-y-4 md:space-y-6">
            <InputSection
              type="email"
              name="email"
              id="email"
              placeholder="name@gmail.com"
              required={true}
              label="Email"
              value={email}
              onChange={(el) => setEmail(el.target.value)}
            />
            <InputSection
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              required={true}
              label="Tên"
              value={name}
              onChange={(el) => setName(el.target.value)}
            />
            <InputSection
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              required={true}
              label="Mật khẩu"
              value={password}
              onChange={(el) => setPassword(el.target.value)}
            />
            <InputSection
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="••••••••"
              required={true}
              label="Xác nhận mật khẩu"
              value={confirmPassword}
              onChange={(el) => setConfirmPassword(el.target.value)}
              showError={
                confirmPassword !== password && confirmPassword.length > 0
              }
              contentError="Mật khẩu không khớp"
            />
            <InputSection
              type="text"
              name="invite"
              id="invite"
              placeholder="Mã mời"
              label="Mã mời"
            />
            <div className="flex">
              <div className="flex items-center h-5">
                <InputSection
                  type="checkbox"
                  name="terms"
                  id="terms"
                  required={true}
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
              </div>
            </div>
            <BasicButton
              text={loading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
              type="button"
              onClick={handleRegis}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
