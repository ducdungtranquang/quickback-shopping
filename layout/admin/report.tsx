import BasicButton from "@/components/button/basic-button";
import InputSection from "@/components/input/input";
import { useToast } from "@/context/toastContext";
import { getReport } from "@/ultils/api/purchase";
import { formatDate } from "@/ultils/func/helper";
import Cookies from "js-cookie";
import { useEffect, useState, HTMLAttributes } from "react";

export default function ReportAdmin() {
  const token = Cookies.get("authToken");
  const { addToast } = useToast();
  const [report, setReport] = useState<any>();
  const [value, setValue] = useState<{
    utm_source?: "";
    limit: 100;
    status?: 0 | 1 | 2;
    merchant?: string;
  }>({ utm_source: "", limit: 100, merchant: "" });

  const fetchReport = async () => {
    const data = await getReport(token!, value);
    if (data) {
      setReport(data.userData);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="">
      <h2 className="text-xl font-medium mb-8">Báo cáo</h2>
      <div className="grid md:max-w-[50%] gap-5">
        <InputSection
          type="text"
          value={value.utm_source}
          label="Utm_source( ID của người dùng )"
          onChange={(e) =>
            setValue((prev: any) => {
              return {
                ...prev,
                utm_source: e.target.value,
              };
            })
          }
        />
        <InputSection
          type="number"
          value={value.limit?.toString()}
          label="Số lượng"
          onChange={(e) =>
            setValue((prev: any) => {
              return {
                ...prev,
                limit: e.target.value,
              };
            })
          }
        />
        <InputSection
          type="text"
          value={value.merchant}
          label="Nền tảng"
          onChange={(e) =>
            setValue((prev: any) => {
              return {
                ...prev,
                merchant: e.target.value,
              };
            })
          }
        />
        <InputSection
          type="number"
          value={value.status?.toString()}
          label="Trạng thái (0 : hold; 1 : approved; 2 : rejected)"
          onChange={(e) =>
            setValue((prev: any) => {
              return {
                ...prev,
                status: e.target.value,
              };
            })
          }
        />
        <BasicButton
          onClick={async () => {
            await fetchReport();
          }}
          type="button"
          text="Tải lại báo cáo"
          styles={{ width: "150px" } as HTMLAttributes<HTMLButtonElement>}
        />
      </div>

      <div className="overflow-scroll bg-white shadow sm:rounded-lg mt-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tên
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Hoa hồng
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Giá
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ngày mua
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Mã giao dịch
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Lý do từ chối
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Trạng thái
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Sản phẩm
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nền tảng
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Đường dẫn mua hàng
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ngày xác nhận
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {report &&
              report?.length &&
              report?.map((p: any, i: number) => (
                <tr key={i}>
                  <td className="px-6 py-4 min-w-[200px] max-w-[300px]">
                    {p?.userName}
                  </td>
                  <td className="px-6 py-4 lg:py-5">{p?.email}</td>
                  <td className="px-6 py-4 lg:py-5 min-w-[120px]">
                    {p?.commission + "Đ"}
                  </td>
                  <td className="px-6 py-4 lg:py-5">
                    {p?.product_price + "Đ"}
                  </td>
                  <td className="px-6 py-4 lg:py-5">
                    {formatDate(p?.transaction_time)}
                  </td>
                  <td className="px-6 py-4 lg:py-5">{p?.transaction_id}</td>
                  <td className="px-6 py-4 lg:py-5">{p?.reason_rejected}</td>
                  <td
                    className={`px-6 py-4 lg:py-5 ${
                      p.status === 1
                        ? "text-green-600"
                        : p.status === 0
                        ? "text-grey-600"
                        : "text-red-600"
                    }`}
                  >
                    {p.status === 1
                      ? "Đã duyệt"
                      : p.status === 0
                      ? "Đang xử lý"
                      : "Hủy"}
                  </td>
                  <td className="px-6 py-4 lg:py-5">{p?.product_name}</td>
                  <td className="px-6 py-4 lg:py-5">{p?.merchant}</td>
                  <td className="px-6 py-4 lg:py-5 min-w-[250px]">
                    <a className="text-blue-600" href={p?.click_url}>
                      Đường dẫn sản phẩm
                    </a>
                  </td>
                  <td className="px-6 py-4 lg:py-5">
                    {formatDate(p?.confirmed_time)}
                  </td>
                  <td className="px-6 py-4 lg:py-5">
                    <a
                      className="text-blue-600 underline"
                      href="https://pub2.accesstrade.vn/report/"
                      target="_blank"
                    >
                      Kiểm tra chi tiết
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
