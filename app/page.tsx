"use client";

import { ArrowRight, Star, Truck, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    category: "Electronics",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Minimalist Smartwatch",
    price: 199.99,
    category: "Wearables",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Ergonomic Desk Chair",
    price: 499.00,
    category: "Furniture",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 149.99,
    category: "Accessories",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] bg-gray-50 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop" 
            alt="Hero Background" 
            fill
            sizes="100vw"
            className="object-cover opacity-10"
            priority
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-4 py-2 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 font-semibold text-sm tracking-wide shadow-sm">
              ✨ New Spring Collection 2026
            </span>
          </motion.div>

          <motion.h1 
            className="mt-8 text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Elevate your lifestyle with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Premium Curations</span>.
          </motion.h1>

          <motion.p 
            className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover exclusive products tailored for modern living. Designed with elegance, engineered for excellence. Upgrade your everyday essentials.
          </motion.p>
          
          <motion.div 
            className="mt-10 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/products" className="group inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Shop Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/categories" className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-medium border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm">
              Explore Categories
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="flex flex-col items-center p-6">
              <div className="bg-indigo-50 p-4 rounded-full text-indigo-600 mb-4">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Free Global Shipping</h3>
              <p className="mt-2 text-gray-500">On all orders over $150</p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="bg-emerald-50 p-4 rounded-full text-emerald-600 mb-4">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">2-Year Warranty</h3>
              <p className="mt-2 text-gray-500">Comprehensive manufacturer protection</p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="bg-rose-50 p-4 rounded-full text-rose-600 mb-4">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Top Rated Support</h3>
              <p className="mt-2 text-gray-500">24/7 dedicated customer service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl text-left">
                Trending Right Now
              </h2>
              <p className="mt-4 text-xl text-gray-500">
                A selection of our most loved products.
              </p>
            </div>
            <Link href="/products" className="hidden md:flex text-indigo-600 font-semibold items-center gap-1 hover:text-indigo-700 group transition">
              View All 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <motion.div 
                key={product.id} 
                className="group relative"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-200 relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  
                  {/* Quick Add Button Overlay */}
                  <div className="absolute bottom-4 left-0 right-0 px-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="w-full bg-white/90 backdrop-blur-md text-gray-900 font-medium py-3 rounded-xl shadow-lg hover:bg-white transition-colors">
                      Quick Add
                    </button>
                  </div>
                </div>
                
                <div className="mt-5 flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 border-b border-transparent group-hover:border-gray-900 transition-all inline-block">
                      <Link href={`/product/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {product.rating}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-gray-900">${product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link href="/products" className="inline-flex text-indigo-600 font-semibold items-center gap-1 hover:text-indigo-700 transition">
              View All Products <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Block */}
      <section className="bg-indigo-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Join the LuxeCart Club</h2>
          <p className="text-indigo-200 mb-8 max-w-xl mx-auto">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row items-center gap-3 justify-center max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full px-5 py-3 rounded-full text-gray-900 outline-none focus:ring-4 focus:ring-indigo-500/50 font-medium transition"
              required
            />
            <button className="w-full sm:w-auto px-8 py-3 rounded-full font-bold bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 transition-all drop-shadow-md">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
