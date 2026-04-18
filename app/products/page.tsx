import { Star, ShoppingBag, Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import AddToCartButton from "@/components/AddToCartButton";

export const metadata = {
  title: "Shop All Products | LuxeCart",
  description: "Browse our complete collection of premium products.",
};

// Use dummy data or fetch from your MongoDB database (GET /api/products)
const products = [
  {
    _id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    category: "Electronics",
    description: "Industry-leading noise cancellation.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    _id: "2",
    name: "Minimalist Smartwatch",
    price: 199.99,
    category: "Wearables",
    description: "Track your health in style.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
  },
  {
    _id: "3",
    name: "Ergonomic Desk Chair",
    price: 499.00,
    category: "Furniture",
    description: "All-day comfort for your home office.",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop",
  },
  {
    _id: "4",
    name: "Mechanical Keyboard",
    price: 149.99,
    category: "Accessories",
    description: "Tactile feedback for faster typing.",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1000&auto=format&fit=crop",
  },
  {
    _id: "5",
    name: "Classic Leather Backpack",
    price: 129.99,
    category: "Accessories",
    description: "Handcrafted from genuine leather.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop"
  },
  {
    _id: "6",
    name: "Ceramic Coffee Pour-Over",
    price: 45.00,
    category: "Home",
    description: "Brew the perfect cup every morning.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1000&auto=format&fit=crop"
  }
];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { userId } = await auth();
  const sp = await searchParams;
  const categoryFilter = sp.category;

  const filteredProducts = categoryFilter 
    ? products.filter((p) => p.category === categoryFilter)
    : products;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              {categoryFilter ? `${categoryFilter} Products` : "All Products"}
            </h1>
            <p className="mt-2 text-gray-600">
              {categoryFilter 
                ? `Explore our premium selection of ${categoryFilter.toLowerCase()}.` 
                : "Discover our collection of high-quality items."}
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 transition">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-900">No products found in this category.</h2>
            <Link href="/products" className="text-indigo-600 mt-4 inline-block hover:underline">
              View all products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
            <div key={product._id} className="group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </div>
              
              <div className="flex flex-col flex-1 p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                  </div>
                  <p className="font-bold text-lg text-gray-900">${product.price.toFixed(2)}</p>
                </div>
                
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>
                
                <div className="mt-auto pt-6 flex gap-3">
                  <Link 
                    href={`/products/${product._id}`}
                    className="flex-1 flex justify-center items-center bg-white border border-gray-300 text-gray-900 text-center py-2.5 rounded-full font-medium hover:bg-gray-50 transition"
                  >
                    Details
                  </Link>
                  <AddToCartButton product={product} />
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
}