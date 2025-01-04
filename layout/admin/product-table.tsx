import InputSection from "@/components/input/input";
import { useToast } from "@/context/toastContext";
import {
  addProduct,
  delProduct,
  getProduct,
  updateProduct,
} from "@/ultils/api/product";
import { removeHttps } from "@/ultils/func/helper";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const defaultData = {
  name: "",
  link: "",
  img: "",
  commission: "",
  sales: "",
  price: "",
  shop: "",
};

export default function ProductTable() {
  const token = Cookies.get("authToken");
  const { addToast } = useToast();
  const [product, setProduct] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>(defaultData);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"edit" | "delete" | null>(
    null
  );
  const [modalProductId, setModalProductId] = useState<string | null>(null);

  const fetchProduct = async () => {
    const data = await getProduct({ page: 1, limit: 10000 });
    if (data) {
      setProduct(data?.data);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const openModal = (action: "edit" | "delete", productId: string) => {
    setModalAction(action);
    setModalProductId(productId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalAction(null);
    setModalProductId(null);
  };

  const handleModalConfirm = async () => {
    if (modalAction === "delete" && modalProductId) {
      await handleDelete(modalProductId);
    } else if (modalAction === "edit" && modalProductId) {
      const user = product.find(
        (p) => removeHttps(editingProduct.link) === modalProductId
      );
      if (user) handleEdit(user);
    }
    closeModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      const res = await updateProduct(
        token!,
        removeHttps(editingProduct.link),
        formData
      );
      if (res.message?.includes("success")) {
        addToast("Thêm mới thành công", "success");
      } else {
        addToast("Thất bại", "error");
      }
    } else {
      const res = await addProduct(token!, formData);
      if (res.message?.includes("success")) {
        addToast("Thêm mới thành công", "success");
      } else {
        addToast("Thất bại", "error");
      }
    }
    fetchProduct();
    setEditingProduct(null);
    setFormData(defaultData);
  };

  const handleDelete = async (id: string) => {
    await delProduct(token!, id);
    fetchProduct();
  };

  const handleEdit = (p: any) => {
    const { _id, __v, ...rest } = p;
    setEditingProduct(p);
    const restData = rest;
    const data = { ...defaultData, ...restData };
    setFormData(data);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-8 px-4 sm:px-6 lg:px-8">
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
          {editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}
        </button>
        {editingProduct && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setFormData(defaultData);
            }}
            type="button"
            className="mt-4 ml-3 bg-red-600 text-white py-2 px-4 rounded-md"
          >
            Hủy
          </button>
        )}
        <button
          onClick={async () => {
            await fetchProduct();
          }}
          type="button"
          className="mt-4 ml-3 bg-green-600 text-white py-2 px-4 rounded-md"
        >
          Tải lại sản phẩm
        </button>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">
              {modalAction === "delete" ? "Xác nhận xóa" : "Xác nhận sửa"}
            </h2>
            <p>
              {modalAction === "delete"
                ? "Bạn có chắc chắn muốn xóa sản phẩm này không?"
                : "Bạn có chắc chắn muốn chỉnh sửa sản phẩm này không?"}
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
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tên
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Link
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ảnh
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
                Bán
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Cửa hàng
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {product &&
              product?.length &&
              product?.map((p) => (
                <tr key={p.link}>
                  <td className="px-6 py-4 min-w-[200px] max-w-[300px]">
                    {p.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{p.link}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={p.img || "/img_no_img.jpg"}
                      alt="img"
                      className="max-w-[120px]"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {p.price + "Đ"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{p.sales}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{p.shop}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {p.commission + "%"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => openModal("delete", removeHttps(p.link))}
                      className="text-red-600 hover:text-red-900"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
