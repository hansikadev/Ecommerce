import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i._id === item._id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),
      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i._id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i._id === id ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'luxe-cart-storage',
    }
  )
);