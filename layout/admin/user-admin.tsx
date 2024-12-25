"use client";

// import {
//   getAllUser,
//   addUser,
//   updateUser,
//   deleteUser,
// } from "@/utils/api/profile";
import { getAllUser, updateUser, addUser, deleteUser } from "@/ultils/api/profile";
import Cookies from "js-cookie";
import { useEffect, useState, useRef } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function UserAdmin() {
  const token = Cookies.get("authToken");
  const [people, setPeople] = useState<any[]>([]);
  const [selectedPeople, setSelectedPeople] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    password: "",
    accountBank: "",
    bankName: "",
    role: 0,
    total: 0,
    phoneNumber: "",
    address: "",
    city: "",
    image: "",
    inviteCode: [],
    money: 0,
  });
  const [editingUser, setEditingUser] = useState<any>(null);
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      await updateUser(token!, editingUser._id, formData);
    } else {
      await addUser(token!, formData);
    }
    fetchUser();
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      accountBank: "",
      bankName: "",
      role: 0,
      total: 0,
      phoneNumber: "",
      address: "",
      city: "",
      image: "",
      inviteCode: [],
      money: 0,
    });
  };

  const handleDelete = async (id: string) => {
    await deleteUser(token!, id);
    fetchUser();
  };

  const handleEdit = (person: any) => {
    setEditingUser(person);
    setFormData(person);
  };

  const toggleAll = () => {
    setSelectedPeople(checked || indeterminate ? [] : people);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl font-semibold mb-4">User Administration</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label
                htmlFor={key}
                className="block text-sm font-medium text-gray-700"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                id={key}
                type="text"
                value={formData[key] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, [key]: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md"
        >
          {editingUser ? "Update User" : "Add User"}
        </button>
      </form>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Select
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
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
                Role
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
            {people.map((person) => (
              <tr key={person._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    checked={selectedPeople.includes(person)}
                    onChange={() =>
                      setSelectedPeople((prev) =>
                        prev.includes(person)
                          ? prev.filter((p) => p !== person)
                          : [...prev, person]
                      )
                    }
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{person.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{person.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{person.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(person)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(person._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
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
