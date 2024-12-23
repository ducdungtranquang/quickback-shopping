"use client";

import React, { useEffect, useMemo, useState } from "react";
import Spinner from "@/components/spinner/spinner";
import useAuth from "@/hook/useAuth";
import GardenLayout from "@/layout/app/garden";
import LuckyWheelLayout from "@/layout/app/lucky-wheel";
import NavBar from "@/layout/app/navbar";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import { getProfile, IProfileResponse } from "@/ultils/api/profile";

export default function EventPage() {
  const [profile, setProfile] = useState<IProfileResponse | null>(null);
  const { isAuthenticated } = useAuth(true);
  const { event } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get("authToken");
      if (token) {
        try {
          const profileData = await getProfile(token);
          setProfile(profileData);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  const renderedLayout = useMemo(() => {
    if (isAuthenticated === null) return <Spinner />;
    if (event === "wheel") {
      return <LuckyWheelLayout profile={profile} />;
    } else if (event === "tree") {
      return <GardenLayout isAuthenticated={isAuthenticated} />;
    }
  }, [event, isAuthenticated, profile]);

  if (isAuthenticated === null) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container">
      <NavBar isAuthenticated={isAuthenticated} />
      <div className="py-6 px-4 bg-gray-100 h-full min-h-screen overflow-y-scroll mt-[120px]">
        {renderedLayout}
      </div>
    </div>
  );
}
