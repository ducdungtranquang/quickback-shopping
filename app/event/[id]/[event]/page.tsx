"use client";

import useAuth from "@/hook/useAuth";
import LuckyWheelLayout from "@/layout/lucky-wheel";
import NavBar from "@/layout/navbar";

export default function EventPage() {
  const { isAuthenticated } = useAuth(false);
  return (
    <div>
      <NavBar isAuthenticated={isAuthenticated} />
      <div className="py-6 px-4 bg-gray-100 h-full min-h-screen overflow-y-scroll mt-[120px]">
        <LuckyWheelLayout />
      </div>
    </div>
  );
}
