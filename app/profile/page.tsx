/* eslint-disable @next/next/no-img-element */
"use client";
import BasicButton from "@/components/button/basic-button";
import InputSection from "@/components/input/input";
import { HTMLAttributes, useState } from "react";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+123456789",
    company: "Example Inc.",
    jobTitle: "Software Engineer",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    bankAccount: "0123456789",
    coinsEarned: "500",
  });

  const styleInput = {
    cursor: !isEditing ? "not-allowed" : "",
    background: isEditing ? "white" : "rgb(249 250 251)",
  } as HTMLAttributes<HTMLInputElement>;

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Profile Card */}
        <div className="w-full md:w-1/3 bg-white rounded-lg shadow p-4">
          <div className="flex flex-col items-center">
            <img
              className="w-24 h-24 rounded-full"
              src="https://via.placeholder.com/100"
              alt="User Avatar"
            />
            <h2 className="mt-4 text-xl font-semibold">{formData.fullName}</h2>
            <BasicButton text="Update your photo" variant="basic" />
          </div>
        </div>

        {/* Account Details */}
        <div className="w-full md:w-2/3 bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Account Details</h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-sm text-blue-600"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Full Name", name: "fullName" },
              { label: "Email", name: "email" },
              { label: "Phone", name: "phone" },
              { label: "Company", name: "company" },
              { label: "Job Title", name: "jobTitle" },
              { label: "Address", name: "address" },
              { label: "City", name: "city" },
              { label: "State", name: "state" },
              { label: "Zip Code", name: "zip" },
            ].map(({ label, name }) => (
              <div key={name}>
                <InputSection
                  label={label}
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  styleInput={styleInput}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="mt-4 bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Bank & Rewards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <InputSection
              label="Bank Account"
              value={formData.bankAccount}
              onChange={handleInputChange}
              disabled={!isEditing}
              styleInput={styleInput}
            />
          </div>

          <div>
            <InputSection
              label="Coins Earned"
              value={formData.coinsEarned}
              onChange={handleInputChange}
              disabled={!isEditing}
              styleInput={styleInput}
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <BasicButton
              text="History"
              styles={
                {
                  maxWidth: "175px",
                  marginRight: "10px",
                } as HTMLAttributes<HTMLButtonElement>
              }
            />
            <BasicButton
              text="Withdraw"
              variant="success"
              styles={
                { maxWidth: "175px" } as HTMLAttributes<HTMLButtonElement>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
