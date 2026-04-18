import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Categories | LuxeCart",
  description: "Browse products by category.",
};

const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Cutting-edge tech, audio, and gadgets.",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1000&auto=format&fit=crop",
    href: "/products?category=Electronics"
  },
  {
    id: 2,
    name: "Wearables",
    description: "Smartwatches and fitness trackers.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    href: "/products?category=Wearables"
  },
  {
    id: 3,
    name: "Furniture",
    description: "Modern furniture for your modern lifestyle.",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop",
    href: "/products?category=Furniture"
  },
  {
    id: 4,
    name: "Accessories",
    description: "Everyday carry, bags, and essentials.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop",
    href: "/products?category=Accessories"
  },
  {
    id: 5,
    name: "Home",
    description: "Kitchenware, decor, and living accessories.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1000&auto=format&fit=crop",
    href: "/products?category=Home"
  }
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Shop by Category</h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500">Pick an aisle and explore our carefully curated collections.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category.id} href={category.href} className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-100 block shadow-sm hover:shadow-xl transition-all duration-300">
              <Image 
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-start text-white">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-sm text-gray-300 mb-4 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {category.description}
                </p>
                <div className="flex items-center gap-2 font-medium text-sm text-white group-hover:text-indigo-400 transition-colors">
                  Explore <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}