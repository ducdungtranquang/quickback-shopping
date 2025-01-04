import React, { createContext, useState, useContext, ReactNode } from "react";
import { CartItem, getCart, addToCart, editCart } from "@/ultils/api/cart";
import Cookies from "js-cookie";
import { useToast } from "./toastContext";

interface CartContextType {
  cart: CartItem[];
  total: number;
  page: number;
  fetchCart: (page: number) => Promise<void>;
  addItem: (item: CartItem) => Promise<any>;
  updateItem: (productId: string, quantity: number) => Promise<any>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const {addToast} = useToast()
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const token = Cookies.get("authToken");

  const fetchCart = async (page: number) => {
    if (!token) {
      return;
    }

    try {
      const response = await getCart(token, page);
      setCart(response.cartItems);
      setTotal(response.total);
      setPage(response.pag);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  const addItem = async (item: CartItem) => {
    if (!token) {
      return;
    }

    try {
      const response = await addToCart(item, token);
      if (response?.message?.includes("success")) {
        setCart((prevCart) => [...prevCart, item]);
        await fetchCart(1);
        addToast("Thành công", "success")
      }
      return response
    } catch (error) {
      addToast("Thất bại", "error")
    }
  };

  const updateItem = async (productId: string, quantity: number) => {
    if (!token) {
      return;
    }

    try {
      const response = await editCart(productId, quantity, token);
      if (response.success) {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          )
        );
      }
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, total, page, fetchCart, addItem, updateItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
