"use client";

import InputSection from "@/components/input/input";
import { useToast } from "@/context/toastContext";
import {
  getAllUser,
  updateUser,
  addUser,
  deleteUser,
} from "@/ultils/api/profile";
import Cookies from "js-cookie";
import { useEffect, useState, useRef } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const defaultData = {
  name: "",
  email: "",
  accountBank: "",
  bankName: "",
  total: 0,
  phoneNumber: "",
  address: "",
  city: "",
  image: "",
  inviteCode: [],
  money: 0,
};

export default function UserAdmin() {
  const token = Cookies.get("authToken");
  const { addToast } = useToast();
  const [people, setPeople] = useState<any[]>([]);
  const [selectedPeople, setSelectedPeople] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>(defaultData);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"edit" | "delete" | null>(
    null
  );
  const [modalUserId, setModalUserId] = useState<string | null>(null);

  const checkbox = useRef<any>();

  const fetchUser = async () => {
    const data = await getAllUser(token!);
    if (data) {
      setPeople(data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const isIndeterminate =
      selectedPeople.length > 0 && selectedPeople.length < people.length;
    setChecked(selectedPeople.length === people.length);
    setIndeterminate(isIndeterminate);
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [selectedPeople]);

  const openModal = (action: "edit" | "delete", userId: string) => {
    setModalAction(action);
    setModalUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalAction(null);
    setModalUserId(null);
  };

  const handleModalConfirm = async () => {
    if (modalAction === "delete" && modalUserId) {
      await handleDelete(modalUserId);
    } else if (modalAction === "edit" && modalUserId) {
      const user = people.find((person) => person._id === modalUserId);
      if (user) handleEdit(user);
    }
    closeModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name) {
      alert("Thiếu trường");
      return;
    }
    if (editingUser) {
      const res = await updateUser(token!, editingUser._id, formData);
      if (res?.message?.includes("success")) {
        addToast("Thành công", "success");
      }
    } else {
      const res = await addUser(token!, formData);
      if (res?.message?.includes("success")) {
        addToast("Thành công", "success");
      }
    }
    fetchUser();
    setEditingUser(null);
    setFormData(defaultData);
  };

  const handleDelete = async (id: string) => {
    const res = await deleteUser(token!, id);
    if (res?.message?.includes("success")) {
      addToast("Thành công", "success");
    }
    fetchUser();
  };

  const handleEdit = (person: any) => {
    const {
      moneyByEvent,
      _id,
      __v,
      googleId,
      trees,
      isVerified,
      role,
      inviteCode,
      ...rest
    } = person;
    setEditingUser(person);
    const restData = rest;
    const data = { ...defaultData, ...restData };
    setFormData(data);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl font-semibold mb-4">User Administration</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(formData)?.map((key) => (
            <div className="text-left" key={key}>
              <label
                htmlFor={key}
                className="block text-sm font-medium text-gray-700"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <InputSection
                id={key}
                type={key === "isVerified" ? "checkbox" : "text"}
                value={formData[key] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, [key]: e.target.value })
                }
                styleInput={
                  { width: key === "isVerified" ? "auto" : "100%" } as any
                }
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md"
        >
          {editingUser ? "Sửa người dùng" : "Thêm người dùng"}
        </button>
        {editingUser && (
          <button
            onClick={() => {
              setEditingUser(null);
              setFormData(defaultData);
            }}
            type="button"
            className="mt-4 ml-3 bg-red-600 text-white py-2 px-4 rounded-md"
          >
            Hủy
          </button>
        )}
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">
              {modalAction === "delete" ? "Xác nhận xóa" : "Xác nhận sửa"}
            </h2>
            <p>
              {modalAction === "delete"
                ? "Bạn có chắc chắn muốn xóa người dùng này không?"
                : "Bạn có chắc chắn muốn chỉnh sửa người dùng này không?"}
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

      <div className="overflow-scroll bg-white shadow sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[250px]"
              >
                ID
              </th>
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
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]"
              >
                Ảnh
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tổng số tiền đã rút
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Số tiền
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ngân hàng
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tài khoản ngân hàng
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tiền kiếm từ sự kiện
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Số điện thoại
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Xác thực tài khoản
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
            {people &&
              people?.length &&
              people?.map((person) => (
                <tr key={person._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{person._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{person.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {person.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={person.image || "/img_no_img.jpg"} alt="" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {person.total + "Đ"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {person.money + "Đ"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {person.bankName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {person.accountBank}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap min-w-[120px]">
                    {person.moneyByEvent.tree + person.moneyByEvent.wheel + "Đ"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {person.phoneNumber}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap ${
                      person.isVerified ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {person.isVerified ? "Đã xác thực" : "Chưa xác thực"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(person)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Sửa
                    </button>
                    {person?.role < 2 && (
                      <button
                        onClick={() => openModal("delete", person._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Xóa
                      </button>
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
