/* eslint-disable react/no-unescaped-entities */
"use client";

import Tabs from "@/components/tabs/tabs";
import useAuth from "@/hook/useAuth";
import NavBar from "@/layout/app/navbar";
import { useEffect, useState } from "react";

export default function PolicyPgae() {
  const { isAuthenticated } = useAuth(false);
  const [activeTab, setActiveTab] = useState("policy");

  const tabs = [
    {
      id: "policy",
      label: "Chính  sách bảo mật",
      content: (
        <>
          <p className="mb-3 text-gray-500 dark:text-gray-400">
            Deliver great service experiences fast - without the complexity of
            traditional ITSM solutions.Accelerate critical development work and
            deploy.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Track work across the enterprise through an open, collaborative
            platform. Link issues across Jira and ingest data from other
            software development tools, so your IT support and operations teams
            have richer contextual information to rapidly respond to requests,
            incidents, and changes.
          </p>
        </>
      ),
    },
    {
      id: "secure",
      label: "Điều khoản",
      content: (
        <>
          <p className="mb-3 text-gray-500 dark:text-gray-400">
            Deliver great service experiences fast - without the complexity of
            traditional ITSM solutions.Accelerate critical development work and
            deploy.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Track work across the enterprise through an open, collaborative
            platform. Link issues across Jira and ingest data from other
            software development tools, so your IT support and operations teams
            have richer contextual information to rapidly respond to requests,
            incidents, and changes.
          </p>
        </>
      ),
    },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
  };

  return (
    <div className="container">
      <NavBar isAuthenticated={isAuthenticated} />
      <div className="bg-gray-100 dark:bg-gray-800 py-8 mt-[100px] px-4 h-full min-h-screen">
        <h2 className="mt-[20px] text-center">
          Điều khoản và chính sách bảo mật
        </h2>
        <Tabs
          tabs={tabs}
          onTabClick={handleTabClick}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
}
