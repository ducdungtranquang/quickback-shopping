"use client";
import AutoCompleteSearch from "@/components/search/autocomplete-search";
import NavBar from "@/layout/navbar";
import { HTMLAttributes } from "react";

export default function SupportPage() {
  return (
    <>
      <NavBar />
      <div className="py-6 px-4 bg-gray-100 h-full min-h-screen overflow-hidden overflow-y-scroll mt-[85px]">
        <AutoCompleteSearch
          categories={[
            "Name",
            "Test",
            "Test",
            "Name",
            "Test",
            "Test",
            "Name",
            "Test",
            "Test",
            "Name",
            "Test",
            "Test",
          ]}
          styles={
            {
              top: 0,
              width: "auto",
              marginTop: "10px",
            } as HTMLAttributes<HTMLDivElement>
          }
        />
        <h2 className="text-xl font-bold text-black sm:text-xl md:text-2xl text-center mt-2">
          Hỗ trợ
        </h2>
      </div>
    </>
  );
}
