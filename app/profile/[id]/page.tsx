/* eslint-disable @next/next/no-img-element */
"use client";
import BasicButton from "@/components/button/basic-button";
import InputSection from "@/components/input/input";
import Spinner from "@/components/spinner/spinner";
import useAuth from "@/hook/useAuth";
import NavBar from "@/layout/app/navbar";
import {
  editProfile,
  getProfile,
  IProfileResponse,
} from "@/ultils/api/profile";
import { HTMLAttributes, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Footer from "@/layout/app/footer";

const UserDetailInfo = () => {
  const token = Cookies.get("authToken");
  const isAuthenticated = useAuth(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    address: "",
    city: "",
    password: "",
    currentPassword: "",
    bankAccount: "",
    bankName: "",
    coinsEarned: "",
    confirmPassword: "",
  });

  const styleInput = {
    cursor: !isEditing ? "not-allowed" : "",
    background: isEditing ? "white" : "rgb(249 250 251)",
  } as HTMLAttributes<HTMLInputElement>;

  const handleSave = async () => {
    if (!isEditing) {
      return;
    }

    if (!formData.password) {
      try {
        const updatedData = {
          name: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phone,
          address: formData.address,
          city: formData.city,
          accountBank: formData.bankAccount,
          bankName: formData.bankName,
          password: formData.password || undefined,
          currentPassword: formData.currentPassword || undefined,
        };

        const response = await editProfile(updatedData, token!);
        if (response) {
          setIsEditing(false);
        } else {
        }
      } catch (error) {
        console.error("Error saving profile:", error);
      }
    } else {
      if (formData.password && formData.password !== formData.confirmPassword) {
        alert("Mật khẩu và mật khẩu xác nhận không khớp!");
        return;
      }
    }
  };

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (isAuthenticated === null) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get("authToken");
      if (token) {
        try {
          const profileData = await getProfile(token);
          setFormData({
            fullName: profileData.name || "",
            email: profileData.email || "",
            phone: profileData.phoneNumber || "",
            age: "",
            address: profileData.address || "",
            city: profileData.city || "",
            password: "",
            currentPassword: "",
            bankAccount: profileData.accountBank || "",
            bankName: profileData.bankName || "",
            coinsEarned: profileData.money.toString() || "0",
            confirmPassword: "",
          });
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    if (!!isAuthenticated && !formData.email) {
      fetchProfile();
    }
  }, []);

  return (
    <div className="container">
      <NavBar isAuthenticated={isAuthenticated.isAuthenticated} />
      {formData?.email ? (
        <div className="container mx-auto p-4 px-6 mt-[120px] h-full min-h-screen">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Profile Card */}
            <div className="w-full md:w-1/3 bg-white rounded-lg shadow p-4">
              <div className="flex flex-col items-center">
                <img
                  className="w-24 h-24 rounded-full"
                  src="https://via.placeholder.com/100"
                  alt="User Avatar"
                />
                <h2 className="mt-4 text-xl font-semibold">
                  {formData.fullName}
                </h2>
                <BasicButton text="Cập nhật ảnh" variant="basic" />
              </div>
            </div>

            {/* Account Details */}
            <div className="w-full md:w-2/3 bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Thông tin chi tiết</h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-sm text-blue-600"
                  >
                    {isEditing ? "Bỏ" : "Sửa"}
                  </button>
                  <button
                    onClick={handleSave}
                    className={`text-sm text-green-600 ${
                      isEditing ? "block" : "hidden"
                    }`}
                  >
                    Lưu
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Họ tên", name: "fullName" },
                  { label: "Email", name: "email" },
                  { label: "Số điện thoại", name: "phone" },
                  { label: "Tuổi", name: "age" },
                  { label: "Địa chỉ", name: "address" },
                  { label: "Thành phố", name: "city" },
                ].map(({ label, name }) => (
                  <div key={name}>
                    <InputSection
                      type={name === "password" ? "password" : "text"}
                      label={label}
                      name={name}
                      placeholder={formData[name] || "Không có dữ liệu"}
                      value={formData[name]}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      styleInput={styleInput}
                    />
                  </div>
                ))}
                {isEditing && (
                  <>
                    <InputSection
                      type={"password"}
                      label={"Nhập mật khẩu hiện tại"}
                      name={"confirm psw"}
                      placeholder={"*****"}
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      styleInput={styleInput}
                    />
                    <InputSection
                      type={"password"}
                      label={"Mật khẩu mới"}
                      name={"confirm psw"}
                      placeholder={"*****"}
                      value={formData.password}
                      onChange={handleInputChange}
                      styleInput={styleInput}
                    />
                    <InputSection
                      type={"password"}
                      label={"Nhập lại mật khẩu"}
                      name={"confirm psw"}
                      placeholder={"*****"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      styleInput={styleInput}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="mt-4 bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-4">
              Ngân hàng & phần thưởng
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <InputSection
                  label="Số tài khoản"
                  value={formData.bankAccount}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  styleInput={styleInput}
                  placeholder={formData.bankAccount || "Không có dữ liệu"}
                />
              </div>
              <div>
                <InputSection
                  label="Ngân hàng"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  styleInput={styleInput}
                  placeholder={formData.bankName || "Không có dữ liệu"}
                />
              </div>

              <div>
                <InputSection
                  label="Tổng số tiền"
                  value={formData.coinsEarned}
                  disabled={true}
                  styleInput={styleInput}
                  placeholder={formData.coinsEarned || "0đ"}
                />
              </div>

              <div className="md:col-span-2 flex justify-end">
                <BasicButton
                  text="Lịch sử"
                  styles={
                    {
                      maxWidth: "175px",
                      marginRight: "10px",
                    } as HTMLAttributes<HTMLButtonElement>
                  }
                />
                <BasicButton
                  text="Rút"
                  variant="success"
                  styles={
                    { maxWidth: "175px" } as HTMLAttributes<HTMLButtonElement>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
      <Footer />
    </div>
  );
};

export default UserDetailInfo;
