import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  quantity: number;
};

type CartAddInput = Omit<CartItem, "quantity"> & { quantity?: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartAddInput) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartAddInput) => {
    const normalizedItem = { ...item, quantity: item.quantity ?? 1 };

    setCart((current) => {
      const existing = current.find((entry) => entry.id === normalizedItem.id);
      if (existing) {
        return current.map((entry) =>
          entry.id === normalizedItem.id
            ? { ...entry, quantity: entry.quantity + normalizedItem.quantity }
            : entry,
        );
      }
      return [...current, normalizedItem];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = useMemo(() => ({ cart, addToCart, removeFromCart, clearCart }), [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
