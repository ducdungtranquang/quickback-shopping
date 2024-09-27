"use client";

import useAuth from "@/hook/useAuth";
import GardenLayout from "@/layout/garden";
import LuckyWheelLayout from "@/layout/lucky-wheel";
import NavBar from "@/layout/navbar";
import { useParams } from "next/navigation";

export default function EventPage() {
  const { isAuthenticated } = useAuth(false);
  const { event } = useParams();
  return (
    <div>
      <NavBar isAuthenticated={isAuthenticated} />
      <div className="py-6 px-4 bg-gray-100 h-full min-h-screen overflow-y-scroll mt-[120px]">
        {event === "wheel" ? (
          <LuckyWheelLayout />
        ) : (
          <div className="mt-[-10px]">
            <GardenLayout />
          </div>
        )}
      </div>
    </div>
  );
}
