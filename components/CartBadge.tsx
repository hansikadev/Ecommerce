"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/useCart";

export default function CartBadge() {
  const [mounted, setMounted] = useState(false);
  const items = useCart((state) => state.items);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link href="/cart" className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition">
      <ShoppingBag className="h-5 w-5" />
      {mounted && itemCount > 0 && (
        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-white">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  );
}