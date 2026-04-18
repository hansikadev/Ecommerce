"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/store/useCart";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const cartState = useCart();
  const { items, removeFromCart, updateQuantity, clearCart } = cartState;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration errors

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          {items.length > 0 && (
             <button 
               onClick={clearCart} 
               className="text-sm font-medium text-red-600 hover:text-red-700 transition flex items-center gap-1"
             >
               <Trash2 className="w-4 h-4" /> Clear All
             </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 flex flex-col items-center text-center mt-6">
            <div className="h-24 w-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6 text-indigo-600">
              <ShoppingBag className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-sm">Looks like you haven't added anything to your cart yet. Let's change that!</p>
            
            <Link 
              href="/products"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:bg-indigo-500 transition shadow-sm hover:shadow-md"
            >
              Start Shopping <ArrowLeft className="h-5 w-5 ml-2 rotate-180" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 flex flex-col gap-4">
              {items.map((item) => (
                <div key={item._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6">
                   <Link href={`/products/${item._id}`} className="relative h-24 w-24 sm:h-32 sm:w-32 bg-gray-100 rounded-xl overflow-hidden shrink-0 block">
                     <Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 6rem, 8rem" className="object-cover" />
                   </Link>

                   <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left">
                     <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                     <p className="text-xl font-bold text-indigo-600">${item.price.toFixed(2)}</p>
                   </div>
                   
                   <div className="flex items-center gap-4 sm:gap-6 mt-4 sm:mt-0">
                     <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full overflow-hidden p-1">
                       <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="p-1 text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition">
                          <Minus className="w-4 h-4" />
                       </button>
                       <span className="w-8 text-center font-medium">{item.quantity}</span>
                       <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="p-1 text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition">
                          <Plus className="w-4 h-4" />
                       </button>
                     </div>
                     <button onClick={() => removeFromCart(item._id)} className="h-10 w-10 flex items-center justify-center bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition">
                       <Trash2 className="w-4 h-4" />
                     </button>
                   </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-96 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 h-fit lg:sticky lg:top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm text-gray-600 mb-6 border-b border-gray-100 pb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-900">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                 <span className="text-lg font-bold text-gray-900">Total</span>
                 <span className="text-2xl font-bold text-indigo-600">${total.toFixed(2)}</span>
              </div>

              <button className="w-full bg-black text-white text-lg font-medium py-4 rounded-full hover:bg-gray-800 transition active:scale-[0.98]">
                Checkout Setup
              </button>
              
              <p className="text-xs text-center text-gray-400 mt-4">
                Taxes are calculated at checkout.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}