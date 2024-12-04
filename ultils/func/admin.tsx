import Dashboard from "@/layout/admin/dashboard";
import InfoAdmin from "@/layout/admin/info-admin";
import ProductAdmin from "@/layout/admin/product-admin";
import RequirementAdmin from "@/layout/admin/requirement";
import Account from "@/layout/admin/settings";
import UserAdmin from "@/layout/admin/user-admin";

export function viewAdmin(viewType: string) {
  switch (viewType) {
    case "dashboard":
      return <Dashboard />;
    case "user":
      return <UserAdmin />;
    case "report":
      return <Dashboard />;
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
