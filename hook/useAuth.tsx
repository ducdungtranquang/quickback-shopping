import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { verifyToken } from "@/ultils/api/auth";

const useAuth = (isNavigation?: boolean) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [role, setRole] = useState<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const hasVerified = useRef(false);

  const navigateLogin = () => {
    if (isNavigation) {
      router.push("/login");
    }
  };

  useEffect(() => {
    const token = Cookies.get("authToken");
    const id = Cookies.get("id");
    const email = Cookies.get("email");

    if (token && id && email && !hasVerified.current) {
      const checkToken = async () => {
        try {
          const isValid = await verifyToken(token);
          if (isValid.valid) {
            setIsAuthenticated(true);
            setRole(isValid?.role!);
          } else {
            Cookies.remove("authToken");
            Cookies.remove("id");
            Cookies.remove("email");
            setIsAuthenticated(false);
            navigateLogin();
          }
        } catch (error) {
          console.error("Token verification failed", error);
          setIsAuthenticated(false);
          navigateLogin();
        }
      };

      checkToken();
      hasVerified.current = true;
    } else if (!token || !id || !email) {
      setIsAuthenticated(false);
      navigateLogin();
    }
  }, [pathname]);

  return { isAuthenticated, role };
};

export default useAuth;
