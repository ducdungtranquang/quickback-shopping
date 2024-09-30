"use client";

import React, { useMemo } from "react";
import Spinner from "@/components/spinner/spinner";
import useAuth from "@/hook/useAuth";
import GardenLayout from "@/layout/garden";
import LuckyWheelLayout from "@/layout/lucky-wheel";
import NavBar from "@/layout/navbar";
import { useParams } from "next/navigation";

export default function EventPage() {
  const { isAuthenticated } = useAuth();
  const { event } = useParams();

  const renderedLayout = useMemo(() => {
    if (isAuthenticated === null) return;
    if (event === "wheel") {
      return <LuckyWheelLayout />;
    }
    return <GardenLayout isAuthenticated={isAuthenticated} />;
  }, [event, isAuthenticated]);

  if (isAuthenticated === null) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <NavBar isAuthenticated={isAuthenticated} />
      <div className="py-6 px-4 bg-gray-100 h-full min-h-screen overflow-y-scroll mt-[120px]">
        {renderedLayout}
      </div>
    </div>
  );
}
