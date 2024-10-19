import React, { createContext, useState, useContext, ReactNode } from "react";
import { CartItem, getCart, addToCart, editCart } from "@/ultils/api/cart";
import Cookies from "js-cookie";
import { useToast } from "./toastContext"; // Import the toastContext for notifications

interface CartContextType {
  cart: CartItem[];
  total: number;
  pag: number;
  fetchCart: (page: number) => Promise<void>;
  addItem: (item: CartItem) => Promise<void>;
  updateItem: (productId: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pag, setPag] = useState<number>(1);
  const token = Cookies.get("authToken");
  const { addToast } = useToast();

  const fetchCart = async (page: number) => {
    if (!token) {
      addToast("No token found. Please login.", "error");
      return;
    }

    try {
      const response = await getCart(token, page);
      setCart(response.cartItems);
      setTotal(response.total);
      setPag(response.pag);
    } catch (error) {
      addToast("Failed to load cart. Please try again.", "error");
      console.error("Failed to fetch cart:", error);
    }
  };

  const addItem = async (item: CartItem) => {
    if (!token) {
      addToast("No token found. Please login.", "error");
      return;
    }

    try {
      const response = await addToCart(item, token);
      if (response.success) {
        setCart((prevCart) => [...prevCart, item]);
        addToast("Item added to cart!", "success");
        fetchCart(1);
      } else {
        addToast("Failed to add item to cart.", "error");
      }
    } catch (error) {
      addToast("Failed to add item to cart. Please try again.", "error");
      console.error("Failed to add item:", error);
    }
  };

  const updateItem = async (productId: string, quantity: number) => {
    if (!token) {
      addToast("No token found. Please login.", "error");
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
        addToast("Cart updated successfully!", "success");
      } else {
        addToast("Failed to update cart.", "error");
      }
    } catch (error) {
      addToast("Failed to update cart. Please try again.", "error");
      console.error("Failed to update item:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, total, pag, fetchCart, addItem, updateItem }}
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
