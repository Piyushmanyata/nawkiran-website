"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { type Product } from "./products";

// Quantity is expressed in kilograms. These bounds are shared by the
// configurator inputs (Products, ProductDetailInteractive) and the cart editor.
export const QTY_STEP = 10;
export const QTY_MIN = 10;
export const QTY_MAX = 1_000_000; // 1,000 tonnes — sanity ceiling for a single line

export interface CartItem {
  id: string; // generated as ${productId}-${neckSize}-${weight}-kgs
  product: Product;
  neckSize: string;
  weight: number;
  quantity: number;
  unit: "kgs";
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, neckSize: string, weight: number, quantity: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleCart: () => void;
  itemCount: number;
  totalKgs: number;
  lastAddedItem: CartItem | null;
  setLastAddedItem: (item: CartItem | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);

  // Safely load from localStorage on client mount
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("nawkiran_cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved cart:", e);
      }
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("nawkiran_cart", JSON.stringify(items));
    }
  }, [items, isMounted]);

  const addItem = (
    product: Product,
    neckSize: string,
    weight: number,
    quantity: number
  ) => {
    const id = `${product.id}-${neckSize.replace(/\s+/g, "")}-${weight}-kgs`;
    const newItem: CartItem = { id, product, neckSize, weight, quantity, unit: "kgs" };
    setItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, newItem];
    });
    
    // Set last added item for Amazon-style notification
    setLastAddedItem(newItem);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const toggleCart = () => setIsOpen((prev) => !prev);

  // Number of distinct specs in the cart (each row is a unique product+neck+weight).
  const itemCount = items.length;

  // Sum of every line item's quantity, in kilograms.
  const totalKgs = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        setIsOpen,
        toggleCart,
        itemCount,
        totalKgs,
        lastAddedItem,
        setLastAddedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
