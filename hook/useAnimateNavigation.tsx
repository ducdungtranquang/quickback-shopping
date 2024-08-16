import { useState } from "react";
import { useRouter } from "next/navigation";

const useAnimateNavigation = (targetPath: string, delay: number = 600) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  const handleNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAnimating(true);
    setTimeout(() => {
      router.push(targetPath);
    }, delay);
  };

  return { isAnimating, handleNavigation };
};

export default useAnimateNavigation;
