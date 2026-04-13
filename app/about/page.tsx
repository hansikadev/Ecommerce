import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Star } from "lucide-react";

export const metadata = {
  title: "Our Story | LuxeCart",
  description: "Learn about the origins of LuxeCart and our commitment to quality.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
              Redefining Premium Shopping
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Founded in 2024, LuxeCart was born out of a simple idea: that high-quality, beautifully designed products shouldn't have to come with a luxury markup. We bypass traditional retail overheads to bring you direct access to the finest craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Grids */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-6">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Quality</h3>
              <p className="text-gray-600">Every product is rigorously tested to ensure it meets our uncompromising standards of durability and aesthetics.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-6">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast & Free Shipping</h3>
              <p className="text-gray-600">We process orders within 24 hours. Because waiting for your new favorite item is the hardest part.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-6">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer First</h3>
              <p className="text-gray-600">Our dedicated support team is available 24/7 to ensure your shopping experience is nothing short of exceptional.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to see the difference?</h2>
          <p className="text-gray-300 mb-8">Join thousands of happy customers who have already made the switch to LuxeCart.</p>
          <Link href="/products" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:bg-indigo-500 transition">
            Shop Now <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}