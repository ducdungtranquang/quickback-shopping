/* eslint-disable react/no-unescaped-entities */
"use client";

import Spinner from "@/components/spinner/spinner";
import DataTable from "@/components/table/table";
import Tabs from "@/components/tabs/tabs";
import { useFetchDataForTab } from "@/hook/useFetchDataForTab";
import NavBar from "@/layout/navbar";
import { getCart } from "@/ultils/api/cart";
import { getPurchase } from "@/ultils/api/purchase";
import { getWithdraw } from "@/ultils/api/withdraw";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function HistoryPage() {
  const token = Cookies.get("authToken");
  const searchParam = useSearchParams();
  const activeId = searchParam.get("activeId");
  const [activeTab, setActiveTab] = useState(activeId || "buy");

  const {
    data: cartData,
    loading: cartLoading,
    error: cartError,
  } = useFetchDataForTab(
    activeTab === "cart" ? activeTab : "",
    async (signal) => getCart(token!, 1, signal)
  );

  const {
    data: buyData,
    loading: buyLoading,
    error: buyError,
  } = useFetchDataForTab(activeTab === "buy" ? activeTab : "", async (signal) =>
    getPurchase(token!, 1, signal)
  );

  const {
    data: withdrawData,
    loading: withdrawLoading,
    error: withdrawError,
  } = useFetchDataForTab(
    activeTab === "withdraw" ? activeTab : "",
    async (signal) => getWithdraw(token!, signal)
  );

  const renderLayoutTab = (
    loading: boolean,
    error: string | null,
    data: any,
    columns: any[],
    navigate?: string[]
  ) => (
    <div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-sm">{error}</p>
      ) : data && data.length > 0 ? (
        <DataTable columns={columns} data={data} navigate={navigate} />
      ) : (
        <p className="text-sm">Không có dữ liệu hiển thị</p>
      )}
    </div>
  );

  const columnsCart = [
    { header: "Id", key: "productId" },
    { header: "Tên", key: "productName" },
    { header: "Giá", key: "price" },
    { header: "Số lượng", key: "quantity" },
    { header: "Đường dẫn mua hàng", key: "productLink" },
    { header: "% Tiền hoàn", key: "cashbackPercentage" },
  ];

  const columnsBuy = [
    { header: "Tên", key: "productName" },
    { header: "Giá", key: "price" },
    { header: "Số lượng", key: "quantity" },
    { header: "Đường dẫn mua hàng", key: "productLink" },
    { header: "% Tiền hoàn", key: "cashbackPercentage" },
    { header: "Ngày mua", key: "purchaseDate" },
  ];

  const columnsWithdraw = [
    { header: "ID", key: "userId" },
    { header: "Ngân hàng", key: "bank" },
    { header: "Mã giao dịch", key: "transId" },
    { header: "Tài khoản ngân hàng", key: "accountBank" },
    { header: "Ngày rút", key: "withdrawDate" },
    { header: "Số tiền", key: "money" },
  ];

  const tabs = [
    {
      id: "buy",
      label: "Mua hàng",
      content: renderLayoutTab(
        buyLoading,
        buyError,
        buyData?.purchaseHistory,
        columnsBuy
      ),
    },
    {
      id: "cart",
      label: "Giỏ hàng",
      content: renderLayoutTab(
        cartLoading,
        cartError,
        cartData?.cartItems,
        columnsCart,
        cartData?.cartItems?.map((item: { productId: any }) => item.productId)
      ),
    },
    {
      id: "withdraw",
      label: "Rút tiền",
      content: renderLayoutTab(
        withdrawLoading,
        withdrawError,
        withdrawData,
        columnsWithdraw
      ),
    },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
  };

  useEffect(() => {
    setActiveTab(activeId || "buy");
  }, [activeId]);

  return (
    <div>
      <NavBar isAuthenticated={true} />
      <div className="bg-gray-100 dark:bg-gray-800 py-8 mt-[100px] px-4 h-full min-h-screen">
        <h2 className="mt-[20px] text-center">Lịch sử</h2>
        <Tabs
          tabs={tabs}
          onTabClick={handleTabClick}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
}
