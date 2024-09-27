/* eslint-disable @next/next/no-img-element */
"use client";
import BasicButton from "@/components/button/basic-button";
import InputSection from "@/components/input/input";
import Spinner from "@/components/spinner/spinner";
import useAuth from "@/hook/useAuth";
import NavBar from "@/layout/navbar";
import { HTMLAttributes, useState } from "react";

const UserDetailInfo = () => {
  const isAuthenticated = useAuth(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+123456789",
    age: "18",
    address: "123 Main St",
    city: "New York",
    password: "",
    currentPassword: "",
    bankAccount: "0123456789",
    coinsEarned: "500",
    confirmPassword: "",
  });

  const styleInput = {
    cursor: !isEditing ? "not-allowed" : "",
    background: isEditing ? "white" : "rgb(249 250 251)",
  } as HTMLAttributes<HTMLInputElement>;

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

  return (
    <>
      <NavBar isAuthenticated={isAuthenticated.isAuthenticated} />
      <div className="container mx-auto p-4 px-6 mt-[100px] h-full min-h-screen">
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
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-sm text-blue-600"
              >
                {isEditing ? "Save" : "Edit"}
              </button>
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
                    placeholder={formData[name]}
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
              />
            </div>
            <div>
              <InputSection
                label="Ngân hàng"
                value={formData.bankAccount}
                onChange={handleInputChange}
                disabled={!isEditing}
                styleInput={styleInput}
              />
            </div>

            <div>
              <InputSection
                label="Tổng số xu"
                value={formData.coinsEarned}
                onChange={handleInputChange}
                disabled={!isEditing}
                styleInput={styleInput}
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
    </>
  );
};

export default UserDetailInfo;
