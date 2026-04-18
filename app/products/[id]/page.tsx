import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, ShieldCheck, Truck } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import { notFound } from "next/navigation";

// Reuse the static data here, in production we would get from DB by id.
const products = [
  {
    _id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    category: "Electronics",
    description: "Industry-leading noise cancellation. Listen to your favorite tracks with absolute clarity. Our adaptive noise cancellation filters out unwanted background chatter, while ensuring voices remain crystal clear.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    _id: "2",
    name: "Minimalist Smartwatch",
    price: 199.99,
    category: "Wearables",
    description: "Track your health in style. Heart rate monitoring, oxygen levels, GPS, and multiple workout modes, all packed into a beautiful aerospace-grade aluminum chassis.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
  },
  {
    _id: "3",
    name: "Ergonomic Desk Chair",
    price: 499.00,
    category: "Furniture",
    description: "All-day comfort for your home office. Built with premium mesh, adaptive lumbar support, and highly adjustable armrests. A perfect companion for coding sessions.",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop",
  },
  {
    _id: "4",
    name: "Mechanical Keyboard",
    price: 149.99,
    category: "Accessories",
    description: "Tactile feedback for faster typing. Hot-swappable switches, per-key RGB backlighting, and a premium CNC machined aluminum case.",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1000&auto=format&fit=crop",
  },
  {
    _id: "5",
    name: "Classic Leather Backpack",
    price: 129.99,
    category: "Accessories",
    description: "Handcrafted from genuine full-grain leather. A timeless design featuring dedicated laptop compartments and high-quality brass hardware.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop"
  },
  {
    _id: "6",
    name: "Ceramic Coffee Pour-Over",
    price: 45.00,
    category: "Home",
    description: "Brew the perfect cup every morning. Our thermal-retaining ceramic holds standard filters comfortably and ensures an even extraction.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1000&auto=format&fit=crop"
  }
];

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const p = await params;
  const product = products.find(prod => prod._id === p.id);
  if (!product) return { title: "Not Found | LuxeCart" };
  
  return {
    title: `${product.name} | LuxeCart`,
    description: product.description
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params for Next.js 15+ convention since `params` is a Promise now
  const activeParams = await params;
  const product = products.find(p => p._id === activeParams.id);
  
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/products" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to all products
        </Link>
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-8 md:p-12">
            
            {/* Image Galery */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-100">
              <Image 
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-cover"
              />
            </div>
            
            {/* Info Container */}
            <div className="flex flex-col justify-center">
              <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">{product.category}</span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="text-3xl font-bold text-gray-900 mb-6">
                ${product.price.toFixed(2)}
              </div>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {product.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100 mt-2 mb-8">
                <AddToCartButton product={product} />
              </div>
              
              {/* Feature Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center text-sm text-gray-600 gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block font-medium text-gray-900">In Stock</span>
                    <span className="text-xs">Ready to ship</span>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block font-medium text-gray-900">Free Shipping</span>
                    <span className="text-xs">On orders over $50</span>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block font-medium text-gray-900">2-Year Warranty</span>
                    <span className="text-xs">Guaranteed quality</span>
                  </div>
                </div>
              </div>
              
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}