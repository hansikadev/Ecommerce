"use client";

import { useCart } from "@/store/useCart";
import { ShoppingBag } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
}

export default function AddToCartButton({ product }: Props) {
  const addToCart = useCart((state) => state.addToCart);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating if wrapped in a link accidentally
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <>
      <button 
        onClick={handleAdd}
        className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-2.5 rounded-full font-medium hover:bg-gray-800 transition active:scale-95"
      >
        <ShoppingBag className="w-4 h-4" />
        Add
      </button>
      <Toaster position="bottom-right" />
    </>
  );
}