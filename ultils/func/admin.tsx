import Dashboard from "@/layout/admin/dashboard";
import InfoAdmin from "@/layout/admin/info-admin";
import ProductAdmin from "@/layout/admin/product-admin";
import ReportAdmin from "@/layout/admin/report";
import RequirementAdmin from "@/layout/admin/requirement";
import Account from "@/layout/admin/settings";
import UserAdmin from "@/layout/admin/user-admin";
import { Dispatch, SetStateAction } from "react";

export function viewAdmin(
  viewType: string,
  func: Dispatch<SetStateAction<string>>
) {
  switch (viewType) {
    case "dashboard":
      return <Dashboard setTypeAdmin={func} />;
    case "user":
      return <UserAdmin />;
    case "report":
      return <ReportAdmin />;
    case "requirement":
      return <RequirementAdmin />;
    case "settings":
      return <Account />;
    case "info":
      return <InfoAdmin />;
    case "product":
      return <ProductAdmin />;
  }
}
