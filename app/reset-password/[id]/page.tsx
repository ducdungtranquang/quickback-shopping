"use client";

import BasicButton from "@/components/button/basic-button";
import InputSection from "@/components/input/input";
import { useToast } from "@/context/toastContext";
import { resetPassword } from "@/ultils/api/auth";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

const App: React.FC = () => {
  const router = useRouter();
  const { addToast } = useToast();
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleConfirmResetPassword = async () => {
    if (password && password === confirmPassword) {
      const res = await resetPassword(id as string, password);
      if (res?.message?.includes("success")) {
        addToast("Cập nhật mật khẩu thành công", "success");
        router.push("/login");
      } else {
        addToast("Cập nhật mật khẩu thất bại", "error");
      }
    } else {
      addToast("Vui lòng nhập điền chính xác thông tin", "error");
    }
  };

  return (
    <div className="text-center p-4 container">
      <h2 className="my-2 text-xl">Cập nhật mật khẩu mới</h2>
      <div className="max-w-[400px] mx-auto">
        <InputSection
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          required={true}
          label="Mật khẩu mới"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <InputSection
          type="password"
          name="confirm-password"
          id="confirm-password"
          placeholder="••••••••"
          required={true}
          label="Xác nhận mật khẩu"
          showError={confirmPassword !== password && confirmPassword.length > 0}
          contentError="Wrong password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="mt-4 mx-auto max-w-[150px]">
        <BasicButton text="Xác nhận" onClick={handleConfirmResetPassword} />
      </div>
    </div>
  );
};

export default App;
