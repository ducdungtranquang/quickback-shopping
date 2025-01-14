/* eslint-disable @next/next/no-img-element */
"use client";
import BasicButton from "@/components/button/basic-button";
import InputSection from "@/components/input/input";
import Spinner from "@/components/spinner/spinner";
import useAuth from "@/hook/useAuth";
import NavBar from "@/layout/app/navbar";
import { changePassword, editProfile, getProfile } from "@/ultils/api/profile";
import { HTMLAttributes, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Footer from "@/layout/app/footer";
import { avaList } from "@/ultils/constant/constant";
import BaseModal from "@/components/modals/base-modal";
import { useToast } from "@/context/toastContext";
import Link from "next/link";
import { requestWithdraw, verifyRequestWithdraw } from "@/ultils/api/withdraw";

const UserDetailInfo = () => {
  const token = Cookies.get("authToken");
  const { addToast } = useToast();
  const isAuthenticated = useAuth(true);
  const [isEditing, setIsEditing] = useState(false);
  const [money, setMoney] = useState(50000);
  const [verifyCode, setVerifyCode] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOpenModalWithDraw, setIsOpenModalWithDraw] = useState(false);
  const [isOpenVerifyCode, setIsOpenVerifyCode] = useState(false);
  const [formData, setFormData] = useState<any>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    password: "",
    currentPassword: "",
    bankAccount: "",
    bankName: "",
    coinsEarned: "",
    image: "",
    confirmPassword: "",
  });

  const styleInput = {
    cursor: !isEditing ? "not-allowed" : "",
    background: isEditing ? "white" : "rgb(249 250 251)",
  } as HTMLAttributes<HTMLInputElement>;

  const fetchProfile = async () => {
    const token = Cookies.get("authToken");
    if (token) {
      try {
        const profileData = await getProfile(token);
        setFormData({
          fullName: profileData.name || "",
          email: profileData.email || "",
          phone: profileData.phoneNumber || "",
          address: profileData.address || "",
          city: profileData.city || "",
          password: "",
          currentPassword: "",
          bankAccount: profileData.accountBank || "",
          bankName: profileData.bankName || "",
          coinsEarned: profileData.money.toString() || "0",
          confirmPassword: "",
          image: profileData.image || "",
          id: profileData._id,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
  };

  const handleSave = async () => {
    if (!isEditing) {
      return;
    }

    try {
      const updatedData = {
        name: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phone,
        address: formData.address,
        city: formData.city,
        accountBank: formData.bankAccount,
        bankName: formData.bankName,
        password: formData.password || "",
        currentPassword: formData.currentPassword || "",
        image: formData.image || "",
      };

      const response = await editProfile(updatedData, token!);
      if (response) {
        setIsEditing(false);
        addToast("Cập nhật thông tin thành công!", "success");
      } else {
        addToast("Cập nhật thông tin thất bại!", "error");
      }
    } catch (error) {
      addToast("Cập nhật thông tin thất bại!", "error");
    }

    if (formData.password && formData.confirmPassword) {
      if (
        formData.password?.toString() === formData.confirmPassword?.toString()
      ) {
        const res = await changePassword(
          formData.password,
          formData.currentPassword,
          token!
        );
        if (res.success) {
          addToast("Đổi mật khẩu thành công!", "success");
        } else {
          addToast("Đổi mật khẩu thất bại!", "error");
        }
      } else {
        addToast("Mật khẩu và mật khẩu xác nhận không khớp!", "error");
      }
    }
  };

  const handleWithdraw = async () => {
    if (
      !formData.bankAccount ||
      !formData.bankName ||
      Number(formData.coinsEarned) < 50000
    ) {
      setIsOpenModalWithDraw(false);
    } else {
      if (money >= 50000) {
        const userId = formData.id;
        const dataUser = {
          userId,
          amount: money,
        };
        setLoading(true);
        const res = await requestWithdraw(token!, dataUser);
        setIsOpenModalWithDraw(false);
        setIsOpenVerifyCode(true);
        setLoading(false);
        setError(false);
      } else {
        setError(true);
      }
    }
  };

  const handleVerify = async () => {
    const data = {
      userId: formData.id,
      verificationCode: verifyCode,
    };
    try {
      const res = await verifyRequestWithdraw(token!, data);
      if (res && res?.status) {
        await fetchProfile();
        addToast("Yêu cầu rút tiền thành công", "success");
        setVerifyCode("");
      } else {
        addToast("Yêu cầu rút tiền thất bại", "error");
      }
      setIsOpenVerifyCode(false);
    } catch (error) {
      addToast("Yêu cầu rút tiền thất bại", "error");
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

  const handleAvatarChange = (newAvatarUrl: string) => {
    setFormData({
      ...formData,
      image: newAvatarUrl,
    });
    setIsPopupOpen(false);
  };

  useEffect(() => {
    if (!!isAuthenticated && !formData.email) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  if (isAuthenticated === null) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

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
                  src={formData["image"] || "https://via.placeholder.com/100"}
                  alt="User Avatar"
                />
                <h2 className="mt-4 text-xl font-semibold">
                  {formData.fullName}
                </h2>
                <BasicButton
                  text="Cập nhật ảnh"
                  variant="basic"
                  onClick={() => setIsPopupOpen(true)}
                />
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
                      name={"currentPassword"}
                      placeholder={"*****"}
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      styleInput={styleInput}
                    />
                    <InputSection
                      type={"password"}
                      label={"Mật khẩu mới"}
                      name={"password"}
                      placeholder={"*****"}
                      value={formData.password}
                      onChange={handleInputChange}
                      styleInput={styleInput}
                    />
                    <InputSection
                      type={"password"}
                      label={"Nhập lại mật khẩu"}
                      name={"confirmPassword"}
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
                  name="bankAccount"
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
                  name="bankName"
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
                <Link
                  className="max-w-[175px] mr-2.5"
                  href={`/history/${formData.id}?activeId=withdraw`}
                >
                  <BasicButton text="Lịch sử" />
                </Link>
                <BasicButton
                  text="Rút"
                  variant="success"
                  styles={
                    { maxWidth: "175px" } as HTMLAttributes<HTMLButtonElement>
                  }
                  onClick={() => setIsOpenModalWithDraw(true)}
                />
              </div>
            </div>
          </div>

          {isPopupOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Chọn ảnh mới</h2>
                <div className="grid grid-cols-3 gap-4">
                  {avaList.map((url) => (
                    <img
                      key={url}
                      src={url}
                      alt="Avatar Option"
                      className="w-24 h-24 rounded-full cursor-pointer border hover:border-blue-500"
                      onClick={() => handleAvatarChange(url)}
                    />
                  ))}
                </div>
                <button
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => setIsPopupOpen(false)}
                >
                  Đóng
                </button>
              </div>
            </div>
          )}

          {isOpenModalWithDraw && (
            <BaseModal
              isOpen={isOpenModalWithDraw}
              onClose={() => setIsOpenModalWithDraw(false)}
              title={
                !formData.bankAccount ||
                !formData.bankName ||
                Number(formData.coinsEarned) < 50000
                  ? "Thất bại"
                  : "Xác nhận rút tiền"
              }
              onConfirm={handleWithdraw}
            >
              <div>
                {!formData.bankAccount ||
                !formData.bankName ||
                Number(formData.coinsEarned) < 50000 ? (
                  <p>Bạn không đủ điều kiện hoặc thiếu thông tin rút tiền</p>
                ) : (
                  <>
                    {!loading ? (
                      <div>
                        <InputSection
                          label="Số tiền rút"
                          value={money.toString()}
                          onChange={(el) => {
                            setMoney(Number(el?.target.value));
                          }}
                          type="number"
                          placeholder={money.toString() || "50000"}
                        />

                        {error && (
                          <p className="mt-4 text-center text-red-500">
                            Số tiền tối thiểu phải là 50000Đ và không được lớn
                            hơn số tiền trong ví
                          </p>
                        )}
                      </div>
                    ) : (
                      <Spinner />
                    )}
                  </>
                )}
              </div>
            </BaseModal>
          )}

          {isOpenVerifyCode && (
            <BaseModal
              isOpen={isOpenVerifyCode}
              onClose={() => {
                setIsOpenVerifyCode(false);
                setVerifyCode("");
              }}
              title={"Nhập mã xác thực"}
              onConfirm={handleVerify}
            >
              <div>
                <InputSection
                  label="Mã xác thực đã gửi về email của bạn, vui lòng kiểm tra và nhập tại đây"
                  value={verifyCode}
                  onChange={(el) => {
                    setVerifyCode(el.target.value);
                  }}
                  placeholder={"Mã xác thực"}
                />

                <p className="mt-4"> Số lần gửi yêu cầu tối đa là 2 lần </p>
              </div>
            </BaseModal>
          )}
        </div>
      ) : (
        <Spinner />
      )}
      <Footer />
    </div>
  );
};

export default UserDetailInfo;
