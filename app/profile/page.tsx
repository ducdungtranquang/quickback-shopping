"use client";
import React, { useEffect, useState } from "react";
import CashbackCard from "@/components/card/cash-card";
import HelpCard from "@/components/card/help-card";
import InfoCard from "@/components/card/info-card";
import BaseModal from "@/components/modals/base-modal";
import useAuth from "@/hook/useAuth";
import NavBar from "@/layout/app/navbar";
import { logout } from "@/ultils/func/api";
import Cookies from "js-cookie";
import { getProfile, IProfileResponse } from "@/ultils/api/profile";
import Spinner from "@/components/spinner/spinner";
import Footer from "@/layout/app/footer";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAuthenticated = useAuth(true);
  const [profile, setProfile] = useState<IProfileResponse | null>(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleConfirm = async () => {
    await logout();
    setIsModalOpen(false);
  };

  const handleWithdraw = () => {
    alert("Rút tiền thành công!");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get("authToken");
      if (token) {
        try {
          const profileData = await getProfile(token);
          setProfile(profileData);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    if (!!isAuthenticated && !profile) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  if (isAuthenticated === null) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container">
      <NavBar isAuthenticated={isAuthenticated.isAuthenticated} />
      {profile ? (
        <div className="mt-[120px] h-full min-h-screen lg:overflow-hidden bg-gray-100 flex flex-col justify-start items-center p-5 pt-0">
          <br />
          <CashbackCard
            totalCashback={`${profile?.total}đ`}
            availableBalance={`${profile?.money}đ`}
            onWithdraw={handleWithdraw}
            userId={profile._id}
          />
          <div className="mt-4 w-full">
            <HelpCard
              title="Sự kiện"
              imgContent={
                <svg
                  className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                </svg>
              }
              description="Tham gia các hoạt động thú vị và giải trí cúng như tối ưu hóa chi phí mua hàng!"
              guidelineLink={`/event/${profile._id}`}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-[10px] w-full mt-4">
            <HelpCard
              title="Lịch sử"
              imgContent={
                <svg
                  className="me-2 w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 14"
                >
                  <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                </svg>
              }
              guidelineLink={`/history/${profile?._id}`}
            />{" "}
            <HelpCard
              title="Yêu thích"
              imgContent={
                <svg
                  className="w-7 h-7 text-gray-500 dark:text-gray-400 w-4 h-4 mb-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              }
              guidelineLink={`/history/${profile?._id}?activeId=cart`}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-around items-center w-full sm:gap-[10px]">
            <InfoCard
              message={"Thông tin cá nhân"}
              link={`/profile/${profile?._id}`}
            />
            <InfoCard
              message={"Hỗ trợ"}
              link="/support"
              icon={
                <svg
                  className="flex-shrink-0 inline w-4 h-4 me-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-around items-center w-full sm:gap-[10px]">
            <InfoCard
              message={"Mã giới thiệu"}
              link={`/event/${profile?._id}`}
              icon={
                <svg
                  className="flex-shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                </svg>
              }
            />
            <InfoCard
              message={"Tham gia Telegram"}
              link="/"
              icon={
                <svg
                  className="flex-shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              }
            />
          </div>

          <div className="text-center w-full sm-w-[auto]">
            <InfoCard
              message={"Đăng xuất"}
              link="/"
              onClick={(e) => {
                e.preventDefault();
                handleOpenModal();
              }}
            />
          </div>
          <BaseModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title="Đăng xuất"
            onConfirm={handleConfirm}
          >
            <p>Bạn có chắc chắn muốn đăng xuất</p>
          </BaseModal>
          <p className="text-gray-500 dark:text-gray-400 bottom-0 pt-2 relative">
            Cảm ơn quý khách đã sử dụng dịch vụ
          </p>
          <Footer />
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default App;
