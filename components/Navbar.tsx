import Link from "next/link";
import { ShoppingBag, Search, Menu } from "lucide-react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import CartBadge from "@/components/CartBadge";

export default async function Navbar() {
  const { userId } = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900 transition">
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Luxe<span className="text-indigo-600">Cart</span>
            </span>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/products" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
            Shop All
          </Link>
          <Link href="/categories" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
            Categories
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
            Our Story
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/search" className="hidden sm:flex p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition">
            <Search className="h-5 w-5" />
          </Link>
          
          <CartBadge />

          <div className="pl-4 border-l border-gray-200">
            {!userId ? (
              <SignInButton mode="modal" fallbackRedirectUrl="/"><button className="text-sm font-medium text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full hover:bg-indigo-100 transition">Sign In</button></SignInButton>
            ) : (
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9 ring-2 ring-white drop-shadow-sm"
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
