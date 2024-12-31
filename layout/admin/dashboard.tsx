import { getCount } from "@/ultils/api/product";
import Cookies from "js-cookie";
import {
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function Dashboard(props: any) {
  const [stats, setStats] = useState([
    {
      id: 1,
      name: "Tổng số người dùng",
      stat: "...",
      icon: UsersIcon,
      type: "user",
    },
    {
      id: 2,
      name: "Cửa hàng",
      stat: "...",
      icon: EnvelopeOpenIcon,
      type: "product",
    },
    {
      id: 3,
      name: "Số sản phẩm",
      stat: "...",
      icon: CursorArrowRaysIcon,
      type: "product",
    },
  ]);

  const token = Cookies.get("authToken");

  const fetchData = async () => {
    try {
      const data = await getCount(token!);
      setStats((prevStats) =>
        prevStats.map((item) =>
          item.id === 3
            ? { ...item, stat: data?.productCount || "255" }
            : item.id === 2
            ? { ...item, stat: data?.shopCount || "25" }
            : { ...item, stat: data?.userCount || "10" }
        )
      );
    } catch (error) {
      console.error("Error fetching product count:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h3 className="text-base font-semibold text-gray-900">Tổng quát</h3>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <item.icon aria-hidden="true" className="size-6 text-white" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {item.stat}
              </p>
              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <div
                    onClick={() => props.setTypeAdmin(item.type)}
                    className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                  >
                    Xem chi tiết<span className="sr-only"> {item.name}</span>
                  </div>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
