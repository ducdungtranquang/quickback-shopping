import Link from "next/link";
import React from "react";

interface CashbackCardProps {
  totalCashback: string;
  availableBalance: string;
  onWithdraw: () => void;
  userId: string;
}

const CashbackCard: React.FC<CashbackCardProps> = ({
  totalCashback,
  availableBalance,
  onWithdraw,
  userId,
}) => {
  return (
    <>
      <div className="max-w-[1024px] w-full p-6 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-md text-white">
        <div className="flex justify-between items-center mb-4 gap-[20px]">
          <div className="flex items-center space-x-2">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="text-lg font-semibold">Hoàn Tiền</h2>
          </div>
          <p style={{ fontSize: "12px" }}>Tổng Tiền Hoàn đã nhận</p>
        </div>
        <div className="flex justify-between items-center mb-6">
          <p className="text-2xl font-bold">{totalCashback}</p>
        </div>
        <div className="flex justify-between items-center flex-wrap">
          <p className="text-sm">Số dư khả dụng: {availableBalance}</p>
          <Link
            href={`/profile/${userId}`}
            className="bg-white text-blue-700 font-bold py-2 px-4 rounded-lg shadow"
          >
            Rút Tiền
          </Link>
        </div>
      </div>
    </>
  );
};

export default CashbackCard;
