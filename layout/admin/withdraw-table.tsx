import BasicButton from "@/components/button/basic-button";
import InputSection from "@/components/input/input";
import { useToast } from "@/context/toastContext";
import {
  approveRequestWithdraw,
  getAllWithdrawRequest,
} from "@/ultils/api/withdraw";
import { formatDate } from "@/ultils/func/helper";
import Cookies from "js-cookie";
import { useEffect, useState, HTMLAttributes } from "react";

export default function WithDrawTable() {
  const token = Cookies.get("authToken");
  const { addToast } = useToast();
  const [withDraw, setWithDraw] = useState<any[]>([]);
  const [editingWithDraw, setEditingWithDraw] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"edit" | "delete" | null>(
    null
  );
  const [modalWithDrawId, setModalWithDrawId] = useState<string | null>(null);
  const [reason, setReason] = useState<string | undefined>(undefined);

  const fetchWithDraw = async () => {
    const data = await getAllWithdrawRequest(token!);
    if (data) {
      setWithDraw(data);
    }
  };

  useEffect(() => {
    fetchWithDraw();
  }, []);

  const openModal = (action: "edit" | "delete", withDrawId: string) => {
    setModalAction(action);
    setModalWithDrawId(withDrawId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalAction(null);
    setModalWithDrawId(null);
  };

  const handleModalConfirm = async () => {
    if (modalAction === "delete" && modalWithDrawId) {
      await handleReject(modalWithDrawId);
    } else if (modalAction === "edit" && modalWithDrawId) {
      handleEdit(modalWithDrawId);
    }
    closeModal();
  };

  const handleReject = async (id: string) => {
    const res = await approveRequestWithdraw(
      token!,
      { status: "rejected", reason: reason },
      id
    );
    if (res && res?.message?.includes("success")) {
      addToast("Thành công", "success");
    }
    fetchWithDraw();
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
    fetchWithDraw();
  };

  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-4">
        <BasicButton
          onClick={async () => {
            await fetchWithDraw();
          }}
          type="button"
          text=" Tải lại yêu cầu"
          styles={{ width: "150px" } as HTMLAttributes<HTMLButtonElement>}
        />
        <a href="http://localhost:8888/order/create_payment_url">
          <BasicButton
            type="button"
            variant="plain"
            text="Thanh toán"
            styles={{ width: "150px" } as HTMLAttributes<HTMLButtonElement>}
          />
        </a>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">
              {modalAction === "delete" ? "Xác nhận xóa" : "Xác nhận sửa"}
            </h2>
            {modalAction === "delete" && (
              <>
                <InputSection
                  label="Lý do"
                  value={reason}
                  onChange={(el) => setReason(el.target.value)}
                />
              </>
            )}
            <p className="py-2">
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
            {withDraw &&
              withDraw?.length &&
              withDraw?.map((p) => (
                <tr key={p.link}>
                  <td className="px-6 py-4 min-w-[200px] max-w-[300px]">
                    {p?.userId?.name}
                  </td>
                  <td className="px-6 py-4 ">{p?.userId?.email}</td>
                  <td className="px-6 py-4  min-w-[120px]">
                    {p?.amount + "Đ"}
                  </td>
                  <td className="px-6 py-4 ">{formatDate(p?.createdAt)}</td>
                  <td
                    className={`px-6 py-4  ${
                      p.status === "pending"
                        ? "text-gray-500"
                        : p.status === "rejected"
                        ? "text-red-800"
                        : "text-green-700"
                    }`}
                  >
                    {p.status}
                  </td>
                  <td className="px-6 py-4  text-sm font-medium min-w-[150px]">
                    {p.status === "pending" ? (
                      <div className="flex flex-col gap-2">
                        <BasicButton
                          onClick={() => {
                            openModal("edit", p._id);
                            setEditingWithDraw(p._id);
                          }}
                          text=" Duyệt"
                          variant="success"
                        />
                        <BasicButton
                          onClick={() => {
                            openModal("delete", p._id);
                            setEditingWithDraw(p._id);
                          }}
                          text="Từ chối"
                          variant="error"
                        />
                      </div>
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
