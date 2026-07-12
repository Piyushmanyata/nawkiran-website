"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { products, type Product } from "./products";

// Quantity is expressed in kilograms. These bounds are shared by the
// configurator inputs (Products, ProductDetailInteractive) and the cart editor.
export const QTY_STEP = 10;
export const QTY_MIN = 10;
export const QTY_MAX = 1_000_000; // 1,000 tonnes — sanity ceiling for a single line

export interface CartItem {
  id: string;
  product: Product;
  neckSize: string;
  weight: number;
  quantity: number;
  unit: "kgs";
}

function cartItemId(productId: string, neckSize: string, weight: number) {
  return `${productId}-${neckSize.replace(/\s+/g, "")}-${weight}-kgs`;
}

function normalizeCartQuantity(quantity: number) {
  if (!Number.isFinite(quantity)) return QTY_MIN;
  return Math.min(QTY_MAX, Math.max(QTY_MIN, Math.round(quantity)));
}

function isValidStoredQuantity(quantity: unknown): quantity is number {
  return (
    typeof quantity === "number" &&
    Number.isFinite(quantity) &&
    Number.isInteger(quantity) &&
    quantity >= QTY_MIN &&
    quantity <= QTY_MAX
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function createCartItem(
  productId: string,
  neckSize: string,
  weight: number,
  quantity: number,
): CartItem | null {
  const product = products.find((candidate) => candidate.id === productId);
  const neck = product?.necks.find((candidate) => candidate.size === neckSize);

  if (!product || !neck || !neck.weights.includes(weight)) return null;

  return {
    id: cartItemId(product.id, neckSize, weight),
    product,
    neckSize,
    weight,
    quantity: normalizeCartQuantity(quantity),
    unit: "kgs",
  };
}

function restoreCartItems(raw: string | null): CartItem[] {
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.reduce<CartItem[]>((items, value) => {
      if (
        !isRecord(value) ||
        !isRecord(value.product) ||
        typeof value.product.id !== "string" ||
        typeof value.neckSize !== "string" ||
        typeof value.weight !== "number" ||
        !isValidStoredQuantity(value.quantity)
      ) {
        return items;
      }

      const item = createCartItem(value.product.id, value.neckSize, value.weight, value.quantity);
      if (!item || item.quantity !== value.quantity) return items;

      const existingIndex = items.findIndex((candidate) => candidate.id === item.id);
      if (existingIndex === -1) return [...items, item];

      return items.map((candidate, index) =>
        index === existingIndex
          ? { ...candidate, quantity: Math.min(QTY_MAX, candidate.quantity + item.quantity) }
          : candidate,
      );
    }, []);
  } catch {
    return [];
  }
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
    setItems(restoreCartItems(localStorage.getItem("nawkiran_cart")));
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
    const newItem = createCartItem(product.id, neckSize, weight, quantity);
    if (!newItem) return;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: Math.min(QTY_MAX, item.quantity + newItem.quantity) }
            : item
        );
      }
      return [...prev, newItem];
    });
    
    // Set last added item for Amazon-style notification
    setLastAddedItem(newItem);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    setLastAddedItem((item) => (item?.id === itemId ? null : item));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (!Number.isFinite(quantity) || quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: normalizeCartQuantity(quantity) } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setLastAddedItem(null);
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
