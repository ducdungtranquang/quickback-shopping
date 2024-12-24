"use client";
import React, { HTMLAttributes, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Spinner from "@/components/spinner/spinner";
import useAuth from "@/hook/useAuth";
import BasicButton from "@/components/button/basic-button";
import { useParams, useRouter } from "next/navigation";
import { verifyAccount } from "@/ultils/api/auth";
import LogoComponent from "@/components/logo";

const App = () => {
  const router = useRouter();
  const { id } = useParams();
  const { isAuthenticated } = useAuth(false);
  const [loading, setLoading] = useState(false);
  const styleBtn = {
    width: "200px",
  } as HTMLAttributes<HTMLButtonElement>;

  const handleVerify = async () => {
    setLoading(true);
    const response = await verifyAccount(id as string);
    if (response) {
      Cookies.set("authToken", response.token);
      Cookies.set("email", response.email);
      Cookies.set("id", response._id);
      Cookies.set("user_name", response.name);
      router.push("/product");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/product");
    }
  }, [isAuthenticated]);

  if (isAuthenticated === null || isAuthenticated === undefined) {
    return <Spinner />;
  }

  return (
    <div className="container flex flex-col items-center p-5 gap-2 h-full min-h-screen max-w-[1024px]">
      <LogoComponent />
      <BasicButton
        text={loading ? "Loading..." : "Xác thực ngay"}
        variant="success"
        styles={styleBtn}
        onClick={handleVerify}
        disabled={loading}
      />
    </div>
  );
};

export default App;
