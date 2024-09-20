import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { verifyToken } from "@/ultils/api/auth";

const useAuth = (isNavigation?: boolean) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const navigateLogin = () => {
    if (isNavigation) {
      router.push("/login");
    }
  };

  useEffect(() => {
    const token = Cookies.get("authToken");
    const id = Cookies.get("id");
    const email = Cookies.get("email");

    if (token && id && email) {
      const checkToken = async () => {
        try {
          const isValid = await verifyToken(token);
          if (isValid) {
            setIsAuthenticated(true);
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
    } else {
      setIsAuthenticated(false);
      navigateLogin();
    }
  }, [router]);

  return { isAuthenticated };
};

export default useAuth;
