"use client";

import CashbackCard from "@/components/card/cash-card";
import HelpCard from "@/components/card/help-card";
import Slider from "@/components/slider/slider";
import useAuth from "@/hook/useAuth";
import NavBar from "@/layout/navbar";

export default function EventPage() {
  const { isAuthenticated } = useAuth(false);
  const slides = [
    <div
      className="bg-blue-500 h-[200px] sm:h-[400px] flex items-center justify-center text-white"
      key={0}
    >
      Slide 1
    </div>,
    <div
      className="bg-green-500 h-[200px] sm:h-[400px] flex items-center justify-center text-white"
      key={1}
    >
      Slide 2
    </div>,
    <div
      className="bg-red-500 h-[200px] sm:h-[400px] flex items-center justify-center text-white"
      key={2}
    >
      Slide 3
    </div>,
  ];

  return (
    <div className="container">
      <NavBar isAuthenticated={isAuthenticated} />
      <div className="py-6 px-4 bg-gray-100 h-full min-h-screen overflow-hidden overflow-y-scroll mt-[120px]">
        <CashbackCard
          totalCashback="0đ"
          availableBalance="0đ"
          onWithdraw={() => {}}
        />
        <div className="mt-4 w-full">
          <HelpCard
            title="Số tiền từ sự kiện: 12000đ"
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
            description="Kiếm tiền không giới hạn từ các sự kiện của QuickBack!"
            guidelineLink="#"
          />
        </div>
        <div className="mt-4 w-full">
          <HelpCard
            title="Mời bạn nhận quà khủng"
            imgContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-link-45deg w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
                viewBox="0 0 16 16"
              >
                <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
                <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
              </svg>
            }
            description="Mời bạn bè tham gia ngay để nhận quà tặng hấp dẫn trị giá lên đến 500k!"
            guidelineLink="#"
            btnContent="Mời ngay"
          />
        </div>
        <div className="mt-4 w-full">
          <Slider slides={slides} loop={true} autoPlay={true} />
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
