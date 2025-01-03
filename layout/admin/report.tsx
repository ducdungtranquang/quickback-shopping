import BasicButton from "@/components/button/basic-button";
import { useToast } from "@/context/toastContext";
import { getReport } from "@/ultils/api/purchase";
import {
  approveRequestWithdraw,
  getAllWithdrawRequest,
} from "@/ultils/api/withdraw";
import { formatDate } from "@/ultils/func/helper";
import Cookies from "js-cookie";
import { useEffect, useState, HTMLAttributes } from "react";

export default function ReportAdmin() {
  const token = Cookies.get("authToken");
  const { addToast } = useToast();
  const [report, setReport] = useState<any>();
  const [editingReport, setEditingReport] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"edit" | "delete" | null>(
    null
  );
  const [modalReportId, setModalReportId] = useState<string | null>(null);

  const fetchReport = async () => {
    const data = await getReport(token!);
    if (data) {
      setReport(data.data);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const openModal = (action: "edit" | "delete", reportId: string) => {
    setModalAction(action);
    setModalReportId(reportId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalAction(null);
    setModalReportId(null);
  };

  const handleModalConfirm = async () => {
    if (modalAction === "delete" && modalReportId) {
      await handleReject(modalReportId);
    } else if (modalAction === "edit" && modalReportId) {
      handleEdit(modalReportId);
    }
    closeModal();
  };

  const handleReject = async (id: string) => {
    const res = await approveRequestWithdraw(
      token!,
      { status: "rejected" },
      id
    );
    if (res && res?.message?.includes("success")) {
      addToast("Thành công", "success");
    }
    fetchReport();
  };

  const handleEdit = async (id: string) => {
    const res = await approveRequestWithdraw(
      token!,
      { status: "approved" },
      id
    );
    if (res && res?.message?.includes("success")) {
      addToast("Thành công", "success");
    }
    fetchReport();
  };

  return (
    <div className="">
      <h2 className="text-xl font-medium mb-8">Báo cáo</h2>
      <BasicButton
        onClick={async () => {
          await fetchReport();
        }}
        type="button"
        text="Tải lại báo cáo"
        styles={{ width: "150px" } as HTMLAttributes<HTMLButtonElement>}
      />

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">
              {modalAction === "delete" ? "Xác nhận xóa" : "Xác nhận sửa"}
            </h2>
            <p>
              {modalAction === "delete"
                ? "Bạn có chắc chắn muốn từ chối yêu cầu này không?"
                : "Bạn có chắc chắn muốn chấp thuận yêu cầu này không?"}
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg mr-2"
              >
                Hủy
              </button>
              <button
                onClick={handleModalConfirm}
                className="bg-red-600 text-white py-2 px-4 rounded-lg"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

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
                Số tiền yêu cầu
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ngày tạo
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {report &&
              report?.length &&
              report?.map((p:any) => (
                <tr key={p.link}>
                  <td className="px-6 py-4 min-w-[200px] max-w-[300px]">
                    {p?.userId?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {p?.userId?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap min-w-[120px]">
                    {p?.amount + "Đ"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(p?.createdAt)}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap ${
                      p.status === "pending"
                        ? "text-gray-500"
                        : p.status === "rejected"
                        ? "text-red-800"
                        : "text-green-700"
                    }`}
                  >
                    {p.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {p.status === "pending" ? (
                      <>
                        <button
                          onClick={() => {
                            openModal("edit", p._id);
                            setEditingReport(p._id);
                          }}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Duyệt
                        </button>
                        <button
                          onClick={() => {
                            openModal("delete", p._id);
                            setEditingReport(p._id);
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          Từ chối
                        </button>
                      </>
                    ) : (
                      <BasicButton text="Kiểm tra" variant="basic" />
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
