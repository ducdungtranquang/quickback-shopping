"use client";

import { CartProvider } from "@/context/cartContext";
import { ToastProvider } from "@/context/toastContext";


export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <CartProvider>{children}</CartProvider>
    </ToastProvider>
  );
}
