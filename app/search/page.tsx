"use client";

import { useState } from "react";
import { Search as SearchIcon, ArrowRight, PackageX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Example static products
const ALL_PRODUCTS = [
  {
    _id: "1",
    name: "Premium Wireless Headphones",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    _id: "2",
    name: "Minimalist Smartwatch",
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
  },
  {
    _id: "3",
    name: "Ergonomic Desk Chair",
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop",
  },
  {
    _id: "4",
    name: "Mechanical Keyboard",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1000&auto=format&fit=crop",
  }
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filteredProducts = ALL_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Search products</h1>
          
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon className="h-6 w-6 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
            </div>
            <input
              type="text"
              autoFocus
              className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 sm:text-lg transition"
              placeholder="Headphones, Chairs, Watches..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Results */}
        {query && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-lg font-medium text-gray-900 mb-6 border-b border-gray-100 pb-4">
              {filteredProducts.length} {filteredProducts.length === 1 ? "result" : "results"} for "{query}"
            </h2>

            {filteredProducts.length > 0 ? (
              <ul className="divide-y border-gray-100 space-y-4">
                {filteredProducts.map((product) => (
                  <li key={product._id} className="pt-4 first:pt-0">
                    <Link href={`/products/${product._id}`} className="group flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition">
                      <div className="flex items-center gap-6">
                        <div className="relative h-16 w-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                          <Image src={product.image} alt={product.name} fill sizes="4rem" className="object-cover" />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.category}</p>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-indigo-600 transition group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <PackageX className="h-12 w-12 text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">No products found matching your search.</p>
                <button 
                  onClick={() => setQuery("")}
                  className="mt-6 text-indigo-600 font-medium hover:text-indigo-500 underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}