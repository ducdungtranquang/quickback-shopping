import Toast from "@/components/toast/toast";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface Toast {
  message: string;
  type: "success" | "error" | "warning";
}

interface ToastContextProps {
  toasts: Toast[];
  addToast: (message: string, type: "success" | "error" | "warning") => void;
  removeToast: (index: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: "success" | "error" | "warning") => {
    setToasts((prev) => [...prev, { message, type }]);
  };
  const removeToast = (index: number) => {
    setToasts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-[999999]">
        {toasts?.map((toast, index) => (
          <Toast
            key={index}
            type={toast.type}
            content={toast.message}
            isHidden={false}
            onClose={() => removeToast(index)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
