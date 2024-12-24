"use client";
import React, { HTMLAttributes, useEffect, useState } from "react";
import useAuth from "@/hook/useAuth";
import { useRouter } from "next/navigation";
import BasicButton from "@/components/button/basic-button";
import LogoComponent from "@/components/logo";
import Spinner from "@/components/spinner/spinner";

const App = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth(false);
  const styleBtn = {
    width: "200px",
  } as HTMLAttributes<HTMLButtonElement>;

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/product");
    }
  }, [isAuthenticated]);

  if (isAuthenticated === null || isAuthenticated === undefined) {
    return <Spinner />;
  }

  return (
    <div className="container flex flex-col items-center p-5 gap-3 h-full min-h-screen max-w-[1024px]">
      <LogoComponent />
      <p className="text-sm text-center">
        Vui lòng xác thực tài khoản của bạn (Reload trang nếu bạn đã xác thực)
      </p>
    </div>
  );
};

export default App;
