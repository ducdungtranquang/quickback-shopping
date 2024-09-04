/* eslint-disable react/no-unescaped-entities */

"use client";

import DataTable from "@/components/table/table";
import Tabs from "@/components/tabs/tabs";
import NavBar from "@/layout/navbar";

export default function HistoryPage() {
  const columnsBuy = [
    { header: "Product name", key: "name" },
    { header: "Color", key: "color" },
    { header: "Category", key: "category" },
    { header: "Price", key: "price" },
  ];

  const dataBuy = [
    {
      name: 'Apple MacBook Pro 17"',
      color: "Silver",
      category: "Laptop",
      price: "$2999",
    },
    {
      name: "Microsoft Surface Pro",
      color: "White",
      category: "Laptop PC",
      price: "$1999",
    },
    {
      name: "Magic Mouse 2",
      color: "Black",
      category: "Accessories",
      price: "$99",
    },
  ];
  const tabs = [
    {
      id: "buy",
      label: "Mua hàng",
      content: (
        <div>
          <DataTable columns={columnsBuy} data={dataBuy} />
        </div>
      ),
    },
    {
      id: "withdraw",
      label: "Rút tiền",
      content: (
        <div>
          <DataTable columns={columnsBuy} data={dataBuy} />
        </div>
      ),
    },
  ];

  const handleTabClick = (id: string) => {
    console.log(`Tab clicked: ${id}`);
  };
  return (
    <div>
      <NavBar />
      <div className="bg-gray-100 dark:bg-gray-800 py-8 mt-[100px] px-4">
        <h2 className="mt-[20px] text-center">Lịch sử</h2>
        <Tabs tabs={tabs} onTabClick={handleTabClick} />
      </div>
    </div>
  );
}
